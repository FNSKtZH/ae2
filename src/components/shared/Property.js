// @flow
import React from 'react'
import TextField from 'material-ui-next/TextField'
import styled from 'styled-components'

import ErrorBoundary from '../shared/ErrorBoundary'

const Container = styled.div`
  margin: 12px 10px;
`

const Property = ({
  properties,
  field: key,
}: {
  properties: object,
  key: string,
}) => {
  return (
    <ErrorBoundary>
      <Container>
        <TextField
          name={key}
          label={key}
          value={properties[key] || ''}
          onChange={this.onChangeVal}
          fullWidth
          multiline
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
        />
      </Container>
    </ErrorBoundary>
  )
}

export default Property
