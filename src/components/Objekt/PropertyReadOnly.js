// @flow
import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
`
const Label = styled.p`
  flex-basis: 200px;
  flex-shrink: 0;
  text-align: right;
  padding-right: 5px;
  margin: 5px 0;
  color: grey;
`
const Value = styled.p`
  margin: 5px 0;
`

const PropertyReadOnly = ({
  label,
  value,
}: {
  label: string,
  value: string | number,
}) => <Container><Label>{`${label}:`}</Label><Value>{value}</Value></Container>

export default PropertyReadOnly
