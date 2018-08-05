import tag2obj from './tag2obj'
import content2obj from './content2obj'
import author2obj from './author2obj'

export default ({tagCsvArray, categoryCsvArray, contentCsvArray, authorCsvArray}) => {
  if (!categoryCsvArray || !tagCsvArray) return {}

  let result = tag2obj({tagCsvArray, categoryCsvArray})

  result = Object.assign(result, content2obj({contentCsvArray, ...result}))
  result = Object.assign(result, author2obj({authorCsvArray}))

  return result
}
