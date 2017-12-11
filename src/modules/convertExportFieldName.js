// @flow
export default val => {
  console.log('convertExportFieldName: val in:', val)
  if (typeof val === 'string' || val instanceof String) {
    console.log('convertExportFieldName: val is string')
    return val
      .replace(/ /g, '-')
      .replace(/\(/g, '')
      .replace(/\)/g, '')
  }
  console.log('convertExportFieldName: val out:', val)
  return val
}
