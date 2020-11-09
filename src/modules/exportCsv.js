import { parse } from 'json2csv'
import fileDownload from 'js-file-download'
import format from 'date-fns/format'

const exportCsv = (jsonData) => {
  // maybe use "AsyncParser" if the synchronous "parse" blocks the ui to badly
  // see: https://mircozeiss.com/json2csv/#json2csv-async-parser-(streaming-api)
  const csvData = parse(jsonData)
  fileDownload(
    csvData,
    `arteigenschaften_${format(new Date(), 'yyyy-MM-dd_HH-mm-ss')}.csv`,
  )
}

export default exportCsv
