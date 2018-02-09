// @flow

import fileSaver from 'file-saver'
import format from 'date-fns/format'

import getXlsxBuffer from './getXlsxBuffer'

export default async ({
  rows,
  onSetMessage,
  columns,
}: {
  rows: Array<Object>,
  onSetMessage: () => void,
  columns: Array<String>,
}) => {
  let buffer
  // first need to add all missing keys to each row
  rows.forEach(o => {
    columns.forEach(c => {
      if (!o.hasOwnProperty(c)) {
        o[c] = null
      }
    })
  })
  try {
    buffer = await getXlsxBuffer(rows, columns)
  } catch (error) {
    console.log(error)
    onSetMessage(error)
  }
  fileSaver.saveAs(
    new Blob([buffer], {
      type: 'application/octet-stream',
    }),
    `arteigenschaften_${format(new Date(), 'YYYY-MM-DD_HH-mm-ss')}.xlsx`
  )
}
