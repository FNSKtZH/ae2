// @flow
import React from 'react'
import TextField from 'material-ui/TextField'
import Linkify from 'react-linkify'
import styled from 'styled-components'

import ErrorBoundary from '../shared/ErrorBoundary'

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
const Container = styled.div`
  padding: 0 0 5px 0;
  .MuiInput-underline-173:before {
    background-color: rgba(0, 0, 0, 0.1) !important;
  }
  .MuiInput-inkbar-169:after {
    height: 1px !important;
  }
`

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
      <Container>
        <Linkify properties={linkifyProperties}>
          <TextField
            label={label}
            value={val}
            fullWidth
            multiline
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
          />
        </Linkify>
      </Container>
    </ErrorBoundary>
  )
}

export default PropertyReadOnly
