// @flow
import React from 'react'
import styled from 'styled-components'
import get from 'lodash/get'
import Linkify from 'react-linkify'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 0.9em;
`
const Row = styled.div`
  display: flex;
`
const Label = styled.p`
  flex-basis: 230px;
  flex-shrink: 0;
  flex-grow: 0;
  text-align: right;
  padding-right: 5px;
  margin: 2px 0;
  color: grey;
`
const Value = styled.p`
  margin: 2px 0;
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

const PropertyCollection = ({ pC }: { pC: Object }) => {
  const userImportedByName = get(pC, 'userByImportedBy.name')
  const userImportedByEmail = get(pC, 'userByImportedBy.email')
  const organizationName = get(pC, 'organizationByOrganizationId.name')

  return (
    <Linkify properties={linkifyProperties}>
      <Container>
        {pC.combining && (
          <Row>
            <Label>{'Zusammenfassend:'}</Label>
            <Value>{pC.combining ? 'ja' : 'nein'}</Value>
          </Row>
        )}
        {pC.lastUpdated && (
          <Row>
            <Label>{'Stand:'}</Label>
            <Value>{pC.lastUpdated}</Value>
          </Row>
        )}
        {pC.links &&
          pC.links.length > 0 && (
            <Row>
              <Label>{'Link:'}</Label>
              <Value>{pC.links}</Value>
            </Row>
          )}
        {pC.termsOfUse && (
          <Row>
            <Label>{'Nutzungsbedingungen:'}</Label>
            <Value>{pC.termsOfUse}</Value>
          </Row>
        )}
        {userImportedByName && (
          <Row>
            <Label>{'Importiert von:'}</Label>
            <Value>{`${userImportedByName}${
              userImportedByEmail ? ` (${userImportedByEmail})` : ``
            }`}</Value>
          </Row>
        )}
        {organizationName && (
          <Row>
            <Label>{'Organisation mit Schreibrecht:'}</Label>
            <Value>{organizationName}</Value>
          </Row>
        )}
      </Container>
    </Linkify>
  )
}

export default PropertyCollection
