// @flow
import React from 'react'
import styled from 'styled-components'
import Linkify from 'react-linkify'

const Container = styled.div`display: flex;`
const Label = styled.p`
  flex-basis: 230px;
  flex-shrink: 0;
  flex-grow: 0;
  text-align: right;
  padding-right: 5px;
  margin: 3px 0;
  padding: 2px;
  color: grey;
`
const Value = styled.p`
  margin: 3px 0;
  padding: 2px;
  width: 100%;
  background-color: #fff9ef;
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
  value: string | number | Boolean,
}) => {
  let val = value
  if (val === true) val = 'ja'
  if (val === false) val = 'nein'

  return (
    <Linkify properties={linkifyProperties}>
      <Container className="property">
        <Label>{`${label}:`}</Label>
        <Value>
          {val}
        </Value>
      </Container>
    </Linkify>
  )
}

export default PropertyReadOnly
