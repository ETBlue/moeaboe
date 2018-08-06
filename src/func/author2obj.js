export default ({authorCsvArray}) => {
  if (!authorCsvArray || authorCsvArray.length === 0 || typeof authorCsvArray !== 'object') return {}

  let authorObj = {}
  const titles = authorCsvArray[0]
  const authorEndpointIdIndex = titles.indexOf('endpoint_id')

  authorCsvArray.forEach((lineArray, lineArrayIndex) => {
    if (lineArrayIndex === 0 ||
      !lineArray[authorEndpointIdIndex] ||
      lineArray[authorEndpointIdIndex].length === 0
    ) {
      return
    }

    let authorObjItem = {}
    titles.forEach((title, titleIndex) => {
      authorObjItem[title] = lineArray[titleIndex]
    })

    const authorObjId = authorObjItem.id.length > 0 ? authorObjItem.id : authorObjItem.endpoint_id
    authorObj[authorObjId] = authorObjItem
  })

  return {authorObj}
}
