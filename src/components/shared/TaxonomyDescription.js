// @flow
import React from 'react'
import styled from 'styled-components'
import get from 'lodash/get'
import Linkify from 'react-linkify'

import ErrorBoundary from './ErrorBoundary'
import PropertyReadOnly from './PropertyReadOnly'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 0.9em;
  background-color: #ffe0b2 !important;
  padding: 8px 16px !important;
  margin: 0;
  column-width: 500px;
`
const linkifyProperties = {
  target: '_blank',
  style: {
    color: 'inherit',
    fontWeight: 100,
    cursor: 'pointer',
    textDecorationColor: 'rgba(0, 0, 0, 0.3)',
    textDecorationStyle: 'dotted',
  },
}

const TaxonomyDescription = ({ taxonomy }: { taxonomy: Object }) => {
  const organizationName = get(taxonomy, 'organizationByOrganizationId.name')

  return (
    <ErrorBoundary>
      <Linkify properties={linkifyProperties}>
        <Container>
          {taxonomy.description && (
            <PropertyReadOnly
              label="Beschreibung"
              value={taxonomy.description}
            />
          )}
          {taxonomy.lastUpdated && (
            <PropertyReadOnly label="Stand" value={taxonomy.lastUpdated} />
          )}
          {taxonomy.links &&
            taxonomy.links.length > 0 && (
              <PropertyReadOnly label="Link" value={taxonomy.links} />
            )}
          {organizationName && (
            <PropertyReadOnly
              label="Organisation mit Schreibrecht"
              value={organizationName}
            />
          )}
        </Container>
      </Linkify>
    </ErrorBoundary>
  )
}

export default TaxonomyDescription
