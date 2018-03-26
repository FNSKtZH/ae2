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
  padding: 13px 16px;
  background-color: #ffe0b2;
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

const PCDescription = ({ pC }: { pC: Object }) => {
  const userImportedByName = get(pC, 'userByImportedBy.name')
  const userImportedByEmail = get(pC, 'userByImportedBy.email')
  const organizationName = get(pC, 'organizationByOrganizationId.name')

  return (
    <ErrorBoundary>
      <Linkify properties={linkifyProperties}>
        <Container>
          {pC.description && (
            <PropertyReadOnly label="Beschreibung" value={pC.description} />
          )}
          {pC.combining && (
            <PropertyReadOnly
              label="Zusammenfassend"
              value={pC.combining ? 'ja' : 'nein'}
            />
          )}
          {pC.lastUpdated && (
            <PropertyReadOnly label="Stand" value={pC.lastUpdated} />
          )}
          {pC.links &&
            pC.links.length > 0 && (
              <PropertyReadOnly label="Link" value={pC.links} />
            )}
          {pC.termsOfUse && (
            <PropertyReadOnly
              label="Nutzungsbedingungen"
              value={pC.termsOfUse}
            />
          )}
          {userImportedByName && (
            <PropertyReadOnly
              label="Importiert von"
              value={`${userImportedByName}${
                userImportedByEmail ? ` (${userImportedByEmail})` : ``
              }`}
            />
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

export default PCDescription
