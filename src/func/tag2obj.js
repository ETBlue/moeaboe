export default ({tagCsvArray, categoryCsvArray}) => {
  if (!tagCsvArray || tagCsvArray.length === 0 || typeof tagCsvArray !== 'object') return {}

  let categoryObj = {}
  let categoryIdArray = []
  const catIdIndex = categoryCsvArray[0].indexOf('id')
  const catTitleIndex = categoryCsvArray[0].indexOf('title')
  categoryCsvArray.forEach((rowArray, rowIndex) => {
    if (rowIndex > 0) {
      categoryObj[rowArray[catIdIndex]] = {id: rowArray[catIdIndex], title: rowArray[catTitleIndex]}
      categoryIdArray.push(rowArray[catIdIndex])
    }
  })

  let tagObj = {}
  let tagTreeObj = {}
  let tagTreeTodoArrayObj = {}
  Object.keys(categoryObj).forEach((categoryId) => {
    tagObj[categoryId] = {}
    tagTreeObj[categoryId] = {}
    tagTreeTodoArrayObj[categoryId] = []
  })

  const titles = tagCsvArray[0]
  tagCsvArray.forEach((lineArray, lineArrayIndex) => {
    if (lineArrayIndex === 0) return

    let tagObjItem = {}
    titles.forEach((title, titleIndex) => {
      tagObjItem[title] = lineArray[titleIndex]
    })

    if (tagObjItem.parent_id.length === 0) {
      tagObj[tagObjItem.category_id][tagObjItem.id] = tagObjItem
      tagTreeObj[tagObjItem.category_id][tagObjItem.id] = {}
    } else {
      tagTreeTodoArrayObj[tagObjItem.category_id].push({...tagObjItem})
    }
  })

  let currentDepth = 0
  let currentPath = []

  const resolveTodos = ({tagObj, tagTreeObj, categoryId, tagTreeTodoArrayObj, depth}) => {
    if (depth < currentDepth) return

    currentDepth += 1
    Object.keys(tagTreeObj).forEach((tagId, tagIdIndex) => {
      currentPath.push(tagId)

      tagTreeTodoArrayObj[categoryId].forEach((todoItem, todoItemIndex) => {
        if (tagId === todoItem.parent_id) {
          currentPath.push(todoItem.id)
          tagObj[categoryId][currentPath.join('/')] = todoItem
          currentPath.pop()

          tagTreeObj[tagId][todoItem.id] = {}
          tagTreeTodoArrayObj[categoryId].splice(todoItemIndex, 1)
        }
      })

      resolveTodos({tagObj, tagTreeObj: tagTreeObj[tagId], categoryId, tagTreeTodoArrayObj, depth})
      currentPath.pop()
    })
    currentDepth -= 1
  }

  const parseTag2TreeByLevel = ({depth}) => {
    categoryIdArray.forEach((categoryId, categoryIdIndex) => {
      resolveTodos({tagObj, tagTreeObj: tagTreeObj[categoryId], categoryId, tagTreeTodoArrayObj, depth})
    })
  }

  parseTag2TreeByLevel({depth: 1})
  parseTag2TreeByLevel({depth: 2})
  parseTag2TreeByLevel({depth: 3})
  parseTag2TreeByLevel({depth: 4})
  console.log(tagTreeTodoArrayObj)

  return {tagObj, categoryObj, categoryIdArray, tagTreeObj}
}
