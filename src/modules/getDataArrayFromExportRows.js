// @flow
export default (exportRows: Array<Object>, columns: Array<String>) => {
  const dataArray = []
  // first the field names:
  if (columns) {
    dataArray.push(columns)
  } else {
    dataArray.push(Object.keys(exportRows[0]))
  }
  // then the field values
  exportRows.forEach(row =>
    dataArray.push(
      Object.keys(row)
        .sort()
        .map((key, index) => {
          /**
           * exceljs errors out if first member of array is null
           * see: https://github.com/guyonroche/exceljs/issues/111
           */
          if (row[key] === null && index === 0) {
            return ''
          }
          return row[key]
        })
    )
  )
  return dataArray
}
