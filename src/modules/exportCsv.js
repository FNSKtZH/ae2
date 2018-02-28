// @flow
import { parse } from 'json2csv'
import fileDownload from 'js-file-download'
import format from 'date-fns/format'

export default (jsonData: Array<Object>) => {
  const csvData = parse(jsonData)
  fileDownload(
    csvData,
    `arteigenschaften_${format(new Date(), 'YYYY-MM-DD_HH-mm-ss')}.csv`
  )
}
