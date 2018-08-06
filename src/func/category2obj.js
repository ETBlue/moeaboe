export default ({categoryCsvArray}) => {
  if (!categoryCsvArray || categoryCsvArray.length === 0 || typeof categoryCsvArray !== 'object') return {}

  let categoryObj = {}
  let categoryIdArray = []
  const titles = categoryCsvArray[0]
  const categoryIdIndex = titles.indexOf('id')

  categoryCsvArray.forEach((lineArray, lineArrayIndex) => {
    if (lineArrayIndex === 0 ||
      !lineArray[categoryIdIndex] ||
      lineArray[categoryIdIndex].length === 0
    ) {
      return
    }

    let categoryObjItem = {}
    titles.forEach((title, titleIndex) => {
      categoryObjItem[title] = lineArray[titleIndex]
    })

    categoryObj[categoryObjItem.id] = categoryObjItem
    categoryIdArray.push(categoryObjItem.id)
  })

  return {categoryObj, categoryIdArray}
}
