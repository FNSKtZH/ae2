// @flow
import json2csv from 'json2csv'
import fileDownload from 'js-file-download'
import format from 'date-fns/format'

export default (jsonData: Array<Object>) => {
  const csvData = json2csv({ data: jsonData })
  fileDownload(
    csvData,
    `arteigenschaften_${format(new Date(), 'YYYY-MM-DD_HH-mm-ss')}.csv`
  )
}
