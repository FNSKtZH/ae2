// @flow
import get from 'lodash/get'

import booleanToJaNein from '../../../modules/booleanToJaNein'
import conv from '../../../modules/convertExportFieldName'

export default ({
  thisObjectsRco,
  exportRcoProperties,
  row,
}: {
  thisObjectsRco: Array<Object>,
  exportRcoProperties: Array<Object>,
  row: Object,
}) => {
  // loop through all properties
  exportRcoProperties.forEach(p => {
    const rcos = thisObjectsRco.filter(r =>
      get(r, 'propertyCollectionByPropertyCollectionId.name') === p.pcname &&
      r.relationType === p.relationtype
    )
    if (p.pname === 'Beziehungspartner_id') {
      // add bp id if wanted
      const vals = rcos
        .map(r => get(r, 'objectByObjectIdRelation.id', null))
        .filter(v => v !== null)
      row[`${conv(p.pcname)}__${conv(p.relationtype)}__${conv(p.pname)}`] = vals.length ?
        vals.join(' | ') :
        null
    } else if (p.pname === 'Beziehungspartner_Name') {
      // add bp name if wanted
      const vals = rcos
        .map(r => get(r, 'objectByObjectIdRelation.name', null))
        .filter(v => v !== null)
      row[`${conv(p.pcname)}__${conv(p.relationtype)}__${conv(p.pname)}`] = vals.length ?
        vals.join(' | ') :
        null
    } else {
      // add field values
      const vals = rcos
        .map(r => {
          const rcoProperties = JSON.parse(r.properties)
          let val = rcoProperties[p.pname] || null
          if (typeof val === 'boolean') {
            val = booleanToJaNein(val)
          }
          return val
        })
        .filter(v => v !== null)
      row[`${conv(p.pcname)}__${conv(p.relationtype)}__${conv(p.pname)}`] = vals.length ?
        vals.join(' | ') :
        null
      }
  })
}
