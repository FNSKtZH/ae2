// @flow
import get from 'lodash/get'

import booleanToJaNein from '../../../modules/booleanToJaNein'
import conv from '../../../modules/convertExportFieldName'

export default ({
  rcoToUse,
  exportRcoProperties,
  row,
}: {
  rcoToUse: Array<Object>,
  exportRcoProperties: Array<Object>,
  row: Object,
}) => {
  rcoToUse.forEach(rco => {
    // 1. check for Beziehungspartner_id
    const rcoP_id = exportRcoProperties.find(
      p =>
        p.pname === 'Beziehungspartner_id' &&
        p.relationtype === rco.relationType
    )
    if (rcoP_id) {
      const bezPartnerId = rcoToUse
        .map(rco => get(rco, 'objectByObjectIdRelation.id', null))
        .join(' | ')
      row[
        `${conv(rcoP_id.pcname)}__${conv(
          rcoP_id.relationtype
        )}__Beziehungspartner_id`
      ] =
        row[
          `${conv(rcoP_id.pcname)}__${conv(
            rcoP_id.relationtype
          )}__Beziehungspartner_id`
        ] === undefined
          ? bezPartnerId
          : row[
              `${conv(rcoP_id.pcname)}__${conv(
                rcoP_id.relationtype
              )}__Beziehungspartner_id`
            ].includes(bezPartnerId)
            ? row[
                `${conv(rcoP_id.pcname)}__${conv(
                  rcoP_id.relationtype
                )}__Beziehungspartner_id`
              ]
            : `${
                row[
                  `${conv(rcoP_id.pcname)}__${conv(
                    rcoP_id.relationtype
                  )}__Beziehungspartner_id`
                ]
              } | ${bezPartnerId}`
    }
    // 2. check for Beziehungspartner_Name
    const rcoP_name = exportRcoProperties.find(
      p =>
        p.pname === 'Beziehungspartner_id' &&
        p.relationtype === rco.relationType
    )
    if (rcoP_name) {
      const bezPartner = rcoToUse
        .map(rco => {
          const bezPartnerTaxonomyName = get(
            rco,
            'objectByObjectIdRelation.taxonomyByTaxonomyId.name',
            ''
          )
          const bezPartnerName = get(rco, 'objectByObjectIdRelation.name', '')
          return `${bezPartnerTaxonomyName}: ${bezPartnerName}`
        })
        .join(' | ')
      row[
        `${conv(rcoP_name.pcname)}__${conv(
          rcoP_name.relationtype
        )}__Beziehungspartner_Name`
      ] =
        row[
          `${conv(rcoP_name.pcname)}__${conv(
            rcoP_name.relationtype
          )}__Beziehungspartner_Name`
        ] === undefined
          ? bezPartner
          : row[
              `${conv(rcoP_name.pcname)}__${conv(
                rcoP_name.relationtype
              )}__Beziehungspartner_Name`
            ].includes(bezPartner)
            ? row[
                `${conv(rcoP_name.pcname)}__${conv(
                  rcoP_name.relationtype
                )}__Beziehungspartner_Name`
              ]
            : `${
                row[
                  `${conv(rcoP_name.pcname)}__${conv(
                    rcoP_name.relationtype
                  )}__Beziehungspartner_Name`
                ]
              } | ${bezPartner}`
    }
    // 3. get properties
    const rcoProperties = JSON.parse(rco.properties)
    exportRcoProperties.forEach(p => {
      if (rcoProperties && rcoProperties[p.pname] !== undefined) {
        let val = rcoProperties[p.pname]
        if (typeof val === 'boolean') {
          val = booleanToJaNein(val)
        }
        row[`${conv(p.pcname)}__${conv(p.relationtype)}__${conv(p.pname)}`] =
          row[
            `${conv(p.pcname)}__${conv(p.relationtype)}__${conv(p.pname)}`
          ] === undefined
            ? val
            : `${
                row[
                  `${conv(p.pcname)}__${conv(p.relationtype)}__${conv(p.pname)}`
                ]
              } | ${val}`
      }
    })
  })

  // add every field if still missing
  exportRcoProperties.forEach(p => {
    if (
      row[`${conv(p.pcname)}__${conv(p.relationtype)}__${conv(p.pname)}`] ===
      undefined
    ) {
      row[`${conv(p.pcname)}__${conv(p.relationtype)}__${conv(p.pname)}`] = null
    }
  })
}
