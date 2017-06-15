// @flow
import React from 'react'
import sortBy from 'lodash/sortBy'
import get from 'lodash/get'

import PropertyReadOnly from './PropertyReadOnly'

const Relation = ({ relation }: { relation: Object }) => {
  const properties = JSON.parse(relation.properties)
  const rPartners = get(relation, 'relationPartnersByRelationId.nodes', [])

  return (
    <div>
      {properties &&
        sortBy(Object.entries(properties), e => e[0]).map(([key, value]) =>
          <PropertyReadOnly key={key} value={value} label={key} />
        )}
      {sortBy(rPartners, p =>
        get(
          p,
          'objectByObjectId.taxonomyObjectsByObjectId.nodes[0].name',
          '(kein Name)'
        )
      ).map((partner, index) => {
        const value = get(
          partner,
          'objectByObjectId.taxonomyObjectsByObjectId.nodes[0].name',
          '(kein Name)'
        )
        return (
          <PropertyReadOnly
            key={index}
            value={value}
            label="Beziehungspartner"
          />
        )
      })}
    </div>
  )
}

export default Relation
