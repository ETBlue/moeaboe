import category2obj from './category2obj'
import tag2obj from './tag2obj'
import content2obj from './content2obj'
import author2obj from './author2obj'

export default ({tagCsvArray, categoryCsvArray, contentCsvArray, authorCsvArray}) => {
  if (!categoryCsvArray || !tagCsvArray) return {}

  let result = category2obj({categoryCsvArray})
  result = Object.assign(result, tag2obj({tagCsvArray, ...result}))
  result = Object.assign(result, content2obj({contentCsvArray, ...result}))
  result = Object.assign(result, author2obj({authorCsvArray}))

  return result
}
