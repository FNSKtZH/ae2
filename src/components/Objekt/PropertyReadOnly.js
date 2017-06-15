// @flow
import React from 'react'
import styled from 'styled-components'
import Linkify from 'react-linkify'

const Container = styled.div`
  display: flex;
`
const Label = styled.p`
  flex-basis: 230px;
  flex-shrink: 0;
  flex-grow: 0;
  text-align: right;
  padding-right: 5px;
  margin: 5px 0;
  color: grey;
`
const Value = styled.p`
  margin: 5px 0;
`
const linkifyProperties = {
  target: '_blank',
  style: {
    color: 'inherit',
    fontWeight: 100,
    cursor: 'pointer',
  },
}

const PropertyReadOnly = ({
  label,
  value,
}: {
  label: string,
  value: string | number,
}) =>
  <Linkify properties={linkifyProperties}>
    <Container><Label>{`${label}:`}</Label><Value>{value}</Value></Container>
  </Linkify>

export default PropertyReadOnly
