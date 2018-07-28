import tag2obj from './tag2obj'

export default ({tagCsvArray, categoryCsvArray}) => {
  if (!categoryCsvArray || !tagCsvArray) return {}

  return tag2obj({tagCsvArray, categoryCsvArray})
}
