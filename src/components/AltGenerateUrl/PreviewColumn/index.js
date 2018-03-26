// @flow
import React from 'react'
import styled from 'styled-components'
import compose from 'recompose/compose'
import get from 'lodash/get'

import exportTaxonomiesData from '../exportTaxonomiesData'
import OptionsChoosen from './OptionsChoosen'
import Preview from './Preview'
import ErrorBoundary from '../../shared/ErrorBoundary'

const enhance = compose(exportTaxonomiesData)

const Container = styled.div`
  padding: 5px 0;
`
const HowToDiv = styled.div`
  padding: 15px 10px 0 10px;
`

const Filter = ({ exportTaxonomiesData }: { exportTaxonomiesData: Object }) => {
  const exportTaxonomies = get(exportTaxonomiesData, 'exportTaxonomies', [])

  return (
    <ErrorBoundary>
      <Container>
        <OptionsChoosen />
        <Preview />
        {exportTaxonomies.length === 0 && (
          <HowToDiv>
            Sobald eine Taxonomie gewählt ist, werden hier Daten angezeigt.
          </HowToDiv>
        )}
      </Container>
    </ErrorBoundary>
  )
}

export default enhance(Filter)
