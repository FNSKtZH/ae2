// @flow

import fileSaver from 'file-saver'
import format from 'date-fns/format'

import getXlsxBuffer from './getXlsxBuffer'

export default async(jsonData: Array < Object > ) => {
  let buffer
  try {
    buffer = await getXlsxBuffer(jsonData)
  } catch (error) {
    // TODO
    console.log(error)
  }
  fileSaver.saveAs(
    new Blob([buffer], {
      type: 'application/octet-stream'
    }),
    `arteigenschaften_${format(new Date(), 'YYYY-MM-DD_HH-mm-ss')}.xlsx`
  )
}