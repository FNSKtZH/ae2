// @flow
export default (exportRows: Array<Object>) => {
  const dataArray = []
  // first the field names:
  dataArray.push(Object.keys(exportRows[0]))
  // then the field values
  exportRows.forEach(row =>
    dataArray.push(
      Object.keys(row).map((key, index) => {
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
