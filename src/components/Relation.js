// @flow
import React from 'react'
import sortBy from 'lodash/sortBy'
import get from 'lodash/get'
import styled from 'styled-components'

import PropertyReadOnly from './PropertyReadOnly'

const Container = styled.div`
  border-bottom: ${props =>
    `${props['data-intermediateRelation'] ? '1px solid #c6c6c6' : 'none'}`};
  padding: 7px 0;
  .property p {
    margin-top: 1px;
    margin-bottom: 1px;
  }
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
  const category = relation.objectByObjectIdRelation.category
  const rPartnerLabel =
    category === 'Lebensräume' ? 'Lebensraum' : `${category}-Art`

  return (
    <Container data-intermediateRelation={intermediateRelation}>
      <PropertyReadOnly
        value={get(relation, 'objectByObjectIdRelation.name', '(kein Name)')}
        label={rPartnerLabel}
      />
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
