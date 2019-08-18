import { parse } from 'json2csv'
import fileDownload from 'js-file-download'
import format from 'date-fns/format'

export default (jsonData) => {
  const csvData = parse(jsonData)
  fileDownload(
    csvData,
    `arteigenschaften_${format(new Date(), 'yyyy-MM-dd_HH-mm-ss')}.csv`,
  )
}
