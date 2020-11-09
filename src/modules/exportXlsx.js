import FileSaver from 'file-saver'
import format from 'date-fns/format'

import getXlsxBuffer from './getXlsxBuffer'

/**
 * TODO:
 * use https://github.com/GoogleChromeLabs/import-from-worker
 * once firefox has implemented worker modules too: https://bugzilla.mozilla.org/show_bug.cgi?id=1247687
 */

const exportXlsx = async ({ rows, onSetMessage }) => {
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

export default exportXlsx
