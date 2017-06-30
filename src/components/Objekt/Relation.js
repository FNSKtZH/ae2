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
  const category = relation.objectByRelatedObjectId.category
  console.log('')
  const rPartnerLabel =
    category === 'Lebensräume' ? 'Lebensraum' : `${category}-Art`
  const rPartners = get(
    relation,
    'objectByRelatedObjectId.taxonomyObjectsByObjectId.nodes',
    []
  )

  return (
    <Container intermediateRelation={intermediateRelation}>
      {sortBy(rPartners, p =>
        get(p, 'name', '(kein Name)')
      ).map((partner, index) => {
        const value = get(partner, 'name', '(kein Name)')
        return (
          <PropertyReadOnly key={index} value={value} label={rPartnerLabel} />
        )
      })}
      {relation.relationType &&
        <PropertyReadOnly
          value={relation.relationType}
          label="Art der Beziehung"
        />}
      {properties &&
        sortBy(Object.entries(properties), e => e[0])
          .filter(([key, value]) => value || value === 0)
          .map(([key, value]) =>
            <PropertyReadOnly key={key} value={value} label={key} />
          )}
    </Container>
  )
}

export default Relation
