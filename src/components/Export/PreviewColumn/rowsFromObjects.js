// @flow
/**
 * would be nice if this code could be moved
 * to a worker
 */
import get from 'lodash/get'
import omit from 'lodash/omit'
import some from 'lodash/some'

import booleanToJaNein from '../../../modules/booleanToJaNein'
import conv from '../../../modules/convertExportFieldName'

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
}) => {
  // need taxFields to filter only data with properties
  const taxFields = ['id']
  let rows = objects
    .map(o => {
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
      //console.log('rco:', rco)
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
      rcoToUse.forEach(rco => {
        const bezPartnerId = get(rco, 'objectByObjectId.id', null)
        if (exportRcoPropertyNames.includes('Beziehungspartner_id')) {
          row[`Beziehungspartner_id`] = bezPartnerId
        }
        const bezPartnerTaxonomyName = get(
          rco,
          'objectByObjectId.taxonomyByTaxonomyId.name',
          ''
        )
        const bezPartnerName = get(rco, 'objectByObjectId.name', '')
        const bezPartner = `${bezPartnerTaxonomyName}: ${bezPartnerName}`
        if (exportRcoPropertyNames.includes('Beziehungspartner_Name')) {
          row[`Beziehungspartner_Name`] = bezPartner
        }
        const rcoProperties = JSON.parse(rco.properties)
        exportRcoProperties.forEach(p => {
          if (rcoProperties && rcoProperties[p.pname] !== undefined) {
            let val = rcoProperties[p.pname]
            if (typeof val === 'boolean') {
              val = booleanToJaNein(val)
            }
            row[`${conv(p.pcname)}__${conv(p.pname)}`] = val
          }
        })
      })
      // add every field if still missing
      exportRcoProperties.forEach(p => {
        if (row[`${conv(p.pcname)}__${conv(p.pname)}`] === undefined) {
          row[`${conv(p.pcname)}__${conv(p.pname)}`] = null
        }
      })
      return row
    })
    .filter(r => {
      if (exportIds.length > 0) return exportIds.includes(r.id)
      return true
    })

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
