// @flow
import React from 'react'
import styled from 'styled-components'
import get from 'lodash/get'

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

const Taxonomy = ({ taxonomy }: { taxonomy: Object }) =>
  <Container>
    <Row>
      <Label>{'Stand:'}</Label>
      <Value>{get(taxonomy, 'lastUpdated', '')}</Value>
    </Row>
    <Row>
      <Label>{'Link:'}</Label><Value>{get(taxonomy, 'links', '')}</Value>
    </Row>
    <Row>
      <Label>{'Organisation mit Schreibrecht:'}</Label>
      <Value>
        {get(taxonomy, 'organizationByOrganizationId.name', '')}
      </Value>
    </Row>
  </Container>

export default Taxonomy
