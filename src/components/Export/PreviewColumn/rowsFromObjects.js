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
  taxProperties,
  withSynonymData,
  pcoProperties,
  pco,
  rco,
  synonyms,
  exportRcoPropertyNames,
  rcoProperties,
  exportIds,
  exportOnlyRowsWithProperties,
  rcoInOneRow,
}) => {
  // need taxFields to filter only data with properties
  const taxFields = [
    'id',
    ...taxProperties.map(p => `${conv(p.taxname)}__${conv(p.pname)}`),
  ]
  const aditionalRows = []
  //console.log('rowsFromObjects 1:',{rcoInOneRow,rcoProperties,exportOnlyRowsWithProperties})
  let rows = objects.map(o => {
    // 1. object
    const row = {}
    row.id = o.id
    const properties = o.properties ? JSON.parse(o.properties) : {}
    taxProperties.forEach(p => {
      let val = null
      if (properties && properties[p.pname] !== undefined) {
        if (typeof properties[p.pname] === 'boolean') {
          val = booleanToJaNein(properties[p.pname])
        } else {
          val = properties[p.pname]
        }
      }
      const fieldName = `${conv(p.taxname)}__${conv(p.pname)}`
      row[fieldName] = val
    })
    const thisObjectsSynonyms = [
      // itself
      o.id,
      // all declared synonyms
      // but only if synonyms data is wanted
      ...synonyms
        .filter(s => withSynonymData && s.objectId === o.id)
        .map(s => s.objectIdSynonym),
    ]
    // 2. pco
    if (pcoProperties.length > 0) {
      const thisObjectsPco = pco.filter(p =>
        thisObjectsSynonyms.includes(p.objectId),
      )
      thisObjectsPco.forEach(pco => {
        const properties = JSON.parse(pco.properties)
        if (properties) {
          pcoProperties.forEach(p => {
            if (properties[p.pname] !== undefined) {
              let val = properties[p.pname]
              if (typeof val === 'boolean') {
                val = booleanToJaNein(val)
              }
              row[`${conv(p.pcname)}__${conv(p.pname)}`] = val
            }
          })
        }
      })
      // add every field if still missing
      pcoProperties.forEach(p => {
        const fieldName = `${conv(p.pcname)}__${conv(p.pname)}`
        if (row[fieldName] === undefined) {
          row[fieldName] = null
        }
      })
    }
    // 3. rco
    if (rcoProperties.length > 0) {
      const thisObjectsRco = rco.filter(p =>
        thisObjectsSynonyms.includes(p.objectId),
      )
      //console.log('rowsFromObjects:',{thisObjectsRco,row})

      /**
       * add all relations comma separated
       * need to group by relationtype
       *
       * TODO:
       * choose to add new row, depending on setting?
       * but then need to make shure only one relationCollection exists
       */
      if (rcoInOneRow) {
        rowsFromObjectsRcoSingleRow({
          thisObjectsRco,
          rcoProperties,
          row,
        })
      } else {
        rowsFromObjectsRcoMultipleRows({
          thisObjectsRco,
          rcoProperties,
          row,
          aditionalRows,
        })
      }
    }
    return row
  })
  rows = [...rows, ...aditionalRows]
  if (exportIds.length > 0) {
    rows = rows.filter(r => exportIds.includes(r.id))
  }
  // sort by id
  // reason: if multiple rows were created per object,
  // they will be next to each other
  rows = sortBy(rows, 'id')
  //console.log('rowsFromObjects 2:',{rows:[...rows]})

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
  //console.log('rowsFromObjects 3:',{rows:[...rows], pvColumns,propertyFields,fields,taxFields})
  return { rows, pvColumns }
}
