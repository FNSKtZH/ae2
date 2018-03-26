// @flow
/**
 * would be nice if this code could be moved
 * to a worker
 */
import omit from 'lodash/omit'
import some from 'lodash/some'
import sortBy from 'lodash/sortBy'

import booleanToJaNein from '../../../modules/booleanToJaNein'
import conv from '../../../modules/convertExportFieldName'
import rowsFromObjectsRcoSingleRow from './rowsFromObjectsRcoSingleRow'
import rowsFromObjectsRcoMultipleRows from './rowsFromObjectsRcoMultipleRows'

export default ({
  objects,
  exportTaxProperties,
  exportWithSynonymData,
  exportPcoProperties,
  pco,
  synonymPco,
  rco,
  synonymRco,
  exportRcoPropertyNames,
  exportRcoProperties,
  exportIds,
  exportOnlyRowsWithProperties,
  exportRcoInOneRow,
}: {
  objects: Array<Object>,
  exportTaxProperties: Array<Object>,
  exportWithSynonymData: Boolean,
  exportPcoProperties: Array<Object>,
  pco: Array<Object>,
  synonymPco: Array<Object>,
  rco: Array<Object>,
  synonymRco: Array<Object>,
  exportRcoPropertyNames: Boolean,
  exportRcoProperties: Array<Object>,
  exportIds: Array<String>,
  exportOnlyRowsWithProperties: Boolean,
  exportRcoInOneRow: Boolean,
}) => {
  // need taxFields to filter only data with properties
  const taxFields = ['id']
  const aditionalRows = []
  let rows = objects.map(o => {
    // 1. object
    const row = {}
    row.id = o.id
    const properties = o.properties ? JSON.parse(o.properties) : {}
    exportTaxProperties.forEach(p => {
      let val = null
      if (properties && properties[p.pname] !== undefined) {
        if (typeof properties[p.pname] === 'boolean') {
          val = booleanToJaNein(properties[p.pname])
        } else {
          val = properties[p.pname]
        }
      }
      taxFields.push(`${conv(p.taxname)}__${conv(p.pname)}`)
      return (row[`${conv(p.taxname)}__${conv(p.pname)}`] = val)
    })
    // 2. pco
    const thisObjectsPco = pco.filter(p => p.objectId === o.id)
    const thisObjectsSynonymPco = synonymPco.filter(p => p.objectId === o.id)
    const pcoToUse = [...thisObjectsPco]
    if (exportWithSynonymData) {
      thisObjectsSynonymPco.forEach(sPco => {
        // add if not yet contained
        const idContained = pcoToUse.find(pco => pco.id === sPco.id)
        if (!idContained) pcoToUse.push(sPco)
      })
    }
    pcoToUse.forEach(pco => {
      const pcoProperties = JSON.parse(pco.properties)
      if (pcoProperties) {
        exportPcoProperties.forEach(p => {
          if (pcoProperties[p.pname] !== undefined) {
            let val = pcoProperties[p.pname]
            if (typeof val === 'boolean') {
              val = booleanToJaNein(val)
            }
            row[`${conv(p.pcname)}__${conv(p.pname)}`] = val
          }
        })
      }
    })
    // add every field if still missing
    exportPcoProperties.forEach(p => {
      if (row[`${conv(p.pcname)}__${conv(p.pname)}`] === undefined) {
        row[`${conv(p.pcname)}__${conv(p.pname)}`] = null
      }
    })
    // 3. rco
    const thisObjectsRco = rco.filter(p => p.objectId === o.id)
    const thisObjectsSynonymRco = synonymRco.filter(p => p.objectId === o.id)
    const rcoToUse = [...thisObjectsRco]
    if (exportWithSynonymData) {
      thisObjectsSynonymRco.forEach(sRco => {
        // add if not yet contained
        const idContained = rcoToUse.find(rco => rco.id === sRco.id)
        if (!idContained) rcoToUse.push(sRco)
      })
    }

    /**
     * add all relations comma separated
     * need to group by relationtype
     *
     * TODO:
     * choose to add new row, depending on setting?
     * but then need to make shure only one relationCollection exists
     */
    if (exportRcoInOneRow) {
      rowsFromObjectsRcoSingleRow({
        rcoToUse,
        exportRcoProperties,
        row,
      })
    } else {
      rowsFromObjectsRcoMultipleRows({
        rcoToUse,
        exportRcoProperties,
        row,
        aditionalRows,
      })
    }
    return row
  })
  rows = [...rows, ...aditionalRows]
  rows = rows.filter(r => {
    if (exportIds.length > 0) return exportIds.includes(r.id)
    return true
  })
  // sort by id
  // reason: if multiple rows were created per object,
  // they will be next to each other
  rows = sortBy(rows, 'id')

  const fields = rows[0] ? Object.keys(rows[0]).map(k => k) : []
  const propertyFields = fields.filter(f => !taxFields.includes(f))
  if (exportOnlyRowsWithProperties && propertyFields.length > 0) {
    // filter rows that only contain values in taxFields
    rows = rows.filter(row => {
      // check if any property field contains a value
      const propertyRow = omit(row, taxFields)
      const valueExists = some(propertyRow, v => v !== undefined && v !== null)
      return valueExists
    })
  }
  const pvColumns = fields.map(k => ({
    key: k,
    name: k,
    resizable: true,
    sortable: true,
  }))
  return { rows, pvColumns }
}
