/**
 * writes a dataArray to an Excel workbook
 */
// see: https://github.com/guyonroche/exceljs/issues/313
// @flow
import * as ExcelJs from 'exceljs/dist/exceljs.min.js'
import getDataArrayFromExportRows from './getDataArrayFromExportRows'

export default async (jsonArray: Array<Object>, columns: Array<String>) => {
  const dataArray = getDataArrayFromExportRows(jsonArray, columns)
  let numberOfColumns =
    dataArray && dataArray[0] && dataArray[0].length ? dataArray[0].length : 0
  if (columns) {
    numberOfColumns = columns.length
  }
  const workbook = new ExcelJs.Workbook()
  const worksheet = workbook.addWorksheet('Daten', {
    views: [
      {
        state: 'frozen',
        xSplit: 0,
        ySplit: 1,
      },
    ],
    autoFilter: {
      from: {
        row: 1,
        column: 1,
      },
      to: {
        row: 1,
        column: numberOfColumns,
      },
    },
  })
  worksheet.addRows(dataArray)
  worksheet.getRow(1).fill = {
    type: 'gradient',
    gradient: 'angle',
    degree: 0,
    stops: [
      { position: 0, color: { argb: 'FFD3D3D3' } },
      { position: 1, color: { argb: 'FFD3D3D3' } },
    ],
  }
  worksheet.getRow(1).font = {
    bold: true,
  }
  worksheet.getRow(1).border = {
    bottom: {
      style: 'thin',
    },
  }
  let buffer
  try {
    buffer = await workbook.xlsx.writeBuffer()
  } catch (error) {
    throw error
  }
  return buffer
}
