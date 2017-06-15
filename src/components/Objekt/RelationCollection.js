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
  },
}

const RelationCollection = ({ rC }: { rC: Object }) =>
  <Linkify properties={linkifyProperties}>
    <Container>
      <Row>
        <Label>{'Art der Beziehung:'}</Label>
        <Value>{get(rC, 'natureOfRelation', '')}</Value>
      </Row>
      <Row>
        <Label>{'Zusammenfassend:'}</Label>
        <Value>{rC.combining ? 'ja' : 'nein'}</Value>
      </Row>
      <Row>
        <Label>{'Stand:'}</Label>
        <Value>{get(rC, 'lastUpdated', '')}</Value>
      </Row>
      <Row>
        <Label>{'Link:'}</Label><Value>{get(rC, 'links', '')}</Value>
      </Row>
      <Row>
        <Label>{'Nutzungsbedingungen:'}</Label>
        <Value>{get(rC, 'termsOfUse', '')}</Value>
      </Row>
      <Row>
        <Label>{'Importiert von:'}</Label>
        <Value>{`${get(rC, 'userByImportedBy.name', '')} (${get(
          rC,
          'userByImportedBy.email',
          ''
        )})`}</Value>
      </Row>
      <Row>
        <Label>{'Organisation mit Schreibrecht:'}</Label>
        <Value>
          {get(rC, 'organizationByOrganizationId.name', '')}
        </Value>
      </Row>
    </Container>
  </Linkify>

export default RelationCollection
