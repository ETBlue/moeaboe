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
  const contentEndpointIdIndex = titles.indexOf('endpoint_id')
  contentCsvArray.forEach((lineArray, lineArrayIndex) => {
    if (lineArrayIndex === 0 ||
      !lineArray[contentEndpointIdIndex] ||
      lineArray[contentEndpointIdIndex].length === 0
    ) {
      return
    }

    let contentObjItem = {}
    titles.forEach((title, titleIndex) => {
      contentObjItem[title] = lineArray[titleIndex]
    })

    let contentObjId = contentObjItem.id.length > 0 ? contentObjItem.id : contentObjItem.endpoint_id
    contentObj[contentObjItem.category_id][`${contentObjItem.tag_id}/${contentObjId}`] = contentObjItem

    const pushContentToTags = ({tagContentObj, contentObjItem, residualTagId}) => {
      tagContentObj[contentObjItem.category_id][residualTagId].push(`${contentObjItem.tag_id}/${contentObjId}`)
      if (residualTagId.includes('/')) {
        const newResidualTagId = residualTagId.slice(0, residualTagId.lastIndexOf('/'))
        pushContentToTags({tagContentObj, contentObjItem, residualTagId: newResidualTagId})
      }
    }
    pushContentToTags({tagContentObj, contentObjItem, residualTagId: contentObjItem.tag_id})
    tagContentObj[contentObjItem.category_id].all.push(`${contentObjItem.tag_id}/${contentObjId}`)
  })

  return {contentObj, tagContentObj}
}
