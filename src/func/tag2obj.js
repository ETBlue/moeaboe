export default ({tagCsvArray, categoryObj, categoryIdArray}) => {
  if (!tagCsvArray || tagCsvArray.length === 0 || typeof tagCsvArray !== 'object') return {}

  let tagObj = {}
  let tagTreeObj = {}
  let tagTreeTodoArrayObj = {}
  categoryIdArray.forEach((categoryId) => {
    tagObj[categoryId] = {}
    tagTreeObj[categoryId] = {}
    tagTreeTodoArrayObj[categoryId] = []
  })

  const titles = tagCsvArray[0]
  const tagEndpointIdIndex = titles.indexOf('endpoint_id')
  tagCsvArray.forEach((lineArray, lineArrayIndex) => {
    if (lineArrayIndex === 0 ||
      !lineArray[tagEndpointIdIndex] ||
      lineArray[tagEndpointIdIndex].length === 0
    ) {
      return
    }

    let tagObjItem = {}
    titles.forEach((title, titleIndex) => {
      tagObjItem[title] = lineArray[titleIndex]
    })

    if (tagObjItem.category_id === 'disabled') {
      return
    }
    const tagObjId = tagObjItem.id.length > 0 ? tagObjItem.id : tagObjItem.endpoint_id
    tagObj[tagObjItem.category_id][tagObjId] = tagObjItem

    const tagObjIdSegmentsArray = tagObjId.split('/')
    let tagParentsArray = []
    for (let i = 1; i <= tagObjIdSegmentsArray.length; i++) {
      const currentTagId = tagObjIdSegmentsArray.slice(0, i).join('/')
      tagParentsArray.push(currentTagId)
    }

    tagParentsArray.forEach((tagId, tagIdIndex) => {
      let currentDepth = 0
      const pushTagToTree = ({tagTreeObj, tagId}) => {
        if (currentDepth === tagIdIndex) {
          if (!tagTreeObj[tagId]) {
            tagTreeObj[tagId] = {}
          }
        } else {
          currentDepth += 1
          const currentTreeId = tagId.split('/').slice(0, currentDepth).join('/')
          pushTagToTree({tagTreeObj: tagTreeObj[currentTreeId], tagId})
          currentDepth -= 1
        }
      }
      pushTagToTree({tagTreeObj: tagTreeObj[tagObjItem.category_id], tagId})
    })
  })

  return {tagObj, tagTreeObj}
}
