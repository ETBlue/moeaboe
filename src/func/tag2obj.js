import date2range from './date2range'

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
  const categoryIdIndex = titles.indexOf('category_id')

  tagCsvArray.forEach((lineArray, lineArrayIndex) => {
    if (lineArrayIndex === 0) return

    let tagObjItem = {}
    titles.forEach((title, titleIndex) => {
      tagObjItem[title] = lineArray[titleIndex]
    })
    tagObj[lineArray[categoryIdIndex]][tagObjItem.parent_id + tagObjItem.id] = tagObjItem

    if (tagObjItem.parent_id.length === 0) {
      tagTreeObj[tagObjItem.category_id][tagObjItem.id] = {}
    } else {
      tagTreeTodoArrayObj[tagObjItem.category_id].push({
        id: tagObjItem.id,
        parent_id: tagObjItem.parent_id,
        category_id: tagObjItem.category_id
      })
    }
  })

  let currentDepth = 0

  const resolveTodos = ({tagTreeObj, categoryId, tagTreeTodoArrayObj, depth}) => {
    if (depth < currentDepth) return

    currentDepth += 1
    Object.keys(tagTreeObj).forEach((tagId, tagIdIndex) => {
      tagTreeTodoArrayObj[categoryId].forEach((todoItem, todoItemIndex) => {
        if (tagId === todoItem.parent_id) {
          tagTreeObj[tagId][todoItem.id] = {}
          tagTreeTodoArrayObj[categoryId].splice(todoItemIndex, 1)
        }
      })
      resolveTodos({tagTreeObj: tagTreeObj[tagId], categoryId, tagTreeTodoArrayObj, depth})
    })
    currentDepth -= 1
  }

  const parseTag2TreeByLevel = ({depth}) => {
    categoryIdArray.forEach((categoryId, categoryIdIndex) => {
      resolveTodos({tagTreeObj: tagTreeObj[categoryId], categoryId, tagTreeTodoArrayObj, depth})
    })
  }

  parseTag2TreeByLevel({depth: 1})
  parseTag2TreeByLevel({depth: 1})

  parseTag2TreeByLevel({depth: 2})
  parseTag2TreeByLevel({depth: 2})

  return {tagObj, categoryObj, categoryIdArray, tagTreeObj}
}
