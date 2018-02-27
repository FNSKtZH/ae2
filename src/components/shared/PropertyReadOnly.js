// @flow
import React from 'react'
import styled from 'styled-components'
import Linkify from 'react-linkify'

import ErrorBoundary from '../shared/ErrorBoundary'

const Container = styled.div`
  display: flex;
`
const Label = styled.p`
  flex-basis: 250px;
  text-align: right;
  padding-right: 5px;
  margin: 3px 0;
  padding: 2px;
  color: grey;
  word-break: break-word;
`
const Value = styled.p`
  margin: 3px 0;
  padding: 2px;
  width: 100%;
  word-break: break-word;
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

const PropertyReadOnly = ({
  label,
  value,
}: {
  label: string,
  value: string | number | Boolean,
}) => {
  let val = value
  if (val === true) val = 'ja'
  if (val === false) val = 'nein'

  return (
    <ErrorBoundary>
      <Linkify properties={linkifyProperties}>
        <Container className="property">
          <Label>{`${label}:`}</Label>
          <Value>{val}</Value>
        </Container>
      </Linkify>
    </ErrorBoundary>
  )
}

export default PropertyReadOnly
