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
  flex-basis: 200px;
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
  },
}

const PropertyCollection = ({ pC }: { pC: Object }) =>
  <Linkify properties={linkifyProperties}>
    <Container>
      <Row>
        <Label>{'Zusammenfassend:'}</Label>
        <Value>{pC.combining ? 'ja' : 'nein'}</Value>
      </Row>
      <Row>
        <Label>{'Stand:'}</Label>
        <Value>{get(pC, 'lastUpdated', '')}</Value>
      </Row>
      <Row>
        <Label>{'Link:'}</Label><Value>{get(pC, 'links', '')}</Value>
      </Row>
      <Row>
        <Label>{'Nutzungsbedingungen:'}</Label>
        <Value>{get(pC, 'termsOfUse', '')}</Value>
      </Row>
      <Row>
        <Label>{'Importiert von:'}</Label>
        <Value>{`${get(pC, 'userByImportedBy.name', '')} (${get(
          pC,
          'userByImportedBy.email',
          ''
        )})`}</Value>
      </Row>
      <Row>
        <Label>{'Organisation mit Schreibrecht:'}</Label>
        <Value>
          {get(pC, 'organizationByOrganizationId.name', '')}
        </Value>
      </Row>
    </Container>
  </Linkify>

export default PropertyCollection
