export default ({authorCsvArray}) => {
  if (!authorCsvArray || authorCsvArray.length === 0 || typeof authorCsvArray !== 'object') return {}

  let authorObj = {}
  const titles = authorCsvArray[0]
  const authorIdIndex = titles.indexOf('id')

  authorCsvArray.forEach((lineArray, lineArrayIndex) => {
    if (lineArrayIndex === 0 ||
      !lineArray[authorIdIndex] ||
      lineArray[authorIdIndex].length === 0
    ) {
      return
    }

    let authorObjItem = {}
    titles.forEach((title, titleIndex) => {
      authorObjItem[title] = lineArray[titleIndex]
    })

    const authorObjId = authorObjItem.parent_id.length === 0 ? authorObjItem.id : `${authorObjItem.parent_id}/${authorObjItem.id}`
    authorObj[authorObjId] = authorObjItem
  })

  return {authorObj}
}
