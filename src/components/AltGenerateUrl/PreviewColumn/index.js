// @flow
import React from 'react'
import styled from 'styled-components'

import OptionsChoosen from './OptionsChoosen'
import Url from './Url'
import ErrorBoundary from '../../shared/ErrorBoundary'

const Container = styled.div`
  padding: 5px;
`

const Filter = () => (
  <ErrorBoundary>
    <Container>
      <Url />
      <OptionsChoosen />
    </Container>
  </ErrorBoundary>
)

export default Filter
