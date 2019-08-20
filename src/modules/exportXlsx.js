import FileSaver from 'file-saver'
import format from 'date-fns/format'

import getXlsxBuffer from './getXlsxBuffer'

export default async ({ rows, onSetMessage }) => {
  let buffer
  try {
    buffer = await getXlsxBuffer(rows)
  } catch (error) {
    console.log(error)
    onSetMessage(error)
  }
  FileSaver.saveAs(
    new Blob([buffer], {
      type: 'application/octet-stream',
    }),
    `arteigenschaften_${format(new Date(), 'yyyy-MM-dd_HH-mm-ss')}.xlsx`,
  )
}
