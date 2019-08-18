import React from 'react'
import get from 'lodash/get'
import styled from 'styled-components'

import PropertyReadOnly from '../../../../../shared/PropertyReadOnly'
import PropertyList from './PropertyList'
import ErrorBoundary from '../../../../../shared/ErrorBoundary'

const Container = styled.div`
  border-bottom: ${props =>
    `${props['data-intermediaterelation'] ? '1px solid #c6c6c6' : 'none'}`};
  padding-top: ${props => `${props['data-intermediaterelation'] ? 0 : '7px'}`};
  padding-bottom: 7px;
  column-width: 500px;
  .property p {
    margin-top: 1px;
    margin-bottom: 1px;
  }
`

const Relation = ({ relation, intermediateRelation }) => {
  // never pass null to Object.entries!!!
  const properties = JSON.parse(relation.properties) || {}
  const taxType = get(
    relation,
    'objectByObjectIdRelation.taxonomyByTaxonomyId.type',
    'Objekt',
  )
    .replace('ART', 'Art')
    .replace('LEBENSRAUM', 'Lebensraum')

  return (
    <Container data-intermediaterelation={intermediateRelation}>
      <ErrorBoundary>
        <PropertyReadOnly
          value={`${get(
            relation,
            'objectByObjectIdRelation.taxonomyByTaxonomyId.name',
            '',
          )}: ${get(relation, 'objectByObjectIdRelation.name', '(kein Name)')}`}
          label={taxType}
        />
        {relation.relationType && (
          <PropertyReadOnly
            value={relation.relationType}
            label="Art der Beziehung"
          />
        )}
        {properties && <PropertyList properties={properties} />}
      </ErrorBoundary>
    </Container>
  )
}

export default Relation
