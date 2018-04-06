// @flow
import React from 'react'
import styled from 'styled-components'
import compose from 'recompose/compose'

import exportTaxonomiesData from '../exportTaxonomiesData'
import OptionsChoosen from './OptionsChoosen'
import Url from './Url'
import ErrorBoundary from '../../shared/ErrorBoundary'

const enhance = compose(exportTaxonomiesData)

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

export default enhance(Filter)
