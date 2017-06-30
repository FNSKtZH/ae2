// @flow
import React from 'react'
import sortBy from 'lodash/sortBy'
import get from 'lodash/get'
import styled from 'styled-components'

import PropertyReadOnly from './PropertyReadOnly'

const Container = styled(({ intermediateRelation, ...rest }) =>
  <div {...rest} />
)`
  border-bottom: ${props =>
    `${props.intermediateRelation ? '1px solid #c6c6c6' : 'none'}`};
  padding: ${props => `${props.intermediateRelation ? '7px 0' : 0}`};
`

const Relation = ({
  relation,
  intermediateRelation,
}: {
  relation: Object,
  intermediateRelation: boolean,
}) => {
  // never pass null to Object.entries!!!
  const properties = JSON.parse(relation.properties) || {}
  const rPartners = get(relation, 'relationPartnersByRelationId.nodes', [])

  return (
    <Container intermediateRelation={intermediateRelation}>
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
    </Container>
  )
}

export default Relation
