import date2range from './date2range'

export default ({contentCsvArray, tagObj, categoryIdArray}) => {
  if (!contentCsvArray || contentCsvArray.length === 0 || typeof contentCsvArray !== 'object') return {}

  let contentObj = {}
  let tagContentObj = {}

  categoryIdArray.forEach((categoryId, categoryIdIndex) => {
    contentObj[categoryId] = {}

    tagContentObj[categoryId] = {}
    tagContentObj[categoryId].all = []
    Object.keys(tagObj[categoryId]).forEach((tagId, tagIdIndex) => {
      tagContentObj[categoryId][tagId] = []
    })
  })

  const titles = contentCsvArray[0]
  const contentIdIndex = titles.indexOf('id')
  contentCsvArray.forEach((lineArray, lineArrayIndex) => {
    if (lineArrayIndex === 0 ||
      !lineArray[contentIdIndex] ||
      lineArray[contentIdIndex].length === 0
    ) {
      return
    }

    let contentObjItem = {}
    titles.forEach((title, titleIndex) => {
      contentObjItem[title] = lineArray[titleIndex]
    })

    const contentObjId = contentObjItem.parent_id.length === 0 ? contentObjItem.id : `${contentObjItem.parent_id}/${contentObjItem.id}`
    contentObj[contentObjItem.category_id][contentObjId] = contentObjItem

    const pushContentToTags = ({tagContentObj, contentObjItem, residualTagId}) => {
      tagContentObj[contentObjItem.category_id][residualTagId].push(contentObjId)
      if (residualTagId.includes('/')) {
        const newResidualTagId = residualTagId.slice(0, residualTagId.lastIndexOf('/'))
        pushContentToTags({tagContentObj, contentObjItem, residualTagId: newResidualTagId})
      }
    }
    pushContentToTags({tagContentObj, contentObjItem, residualTagId: contentObjItem.tag_id})
    tagContentObj[contentObjItem.category_id].all.push(contentObjId)
  })

  return {contentObj, tagContentObj}
}
