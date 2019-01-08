// @flow
import React from 'react'
import styled from 'styled-components'
import get from 'lodash/get'
import { useQuery } from 'react-apollo-hooks'
import gql from 'graphql-tag'

import OptionsChoosen from './OptionsChoosen'
import Preview from './Preview'
import ErrorBoundary from '../../shared/ErrorBoundary'

const Container = styled.div`
  padding: 5px 0;
`
const HowToDiv = styled.div`
  padding: 15px 10px 0 10px;
`

const storeQuery = gql`
  query storeQuery {
    exportTaxonomies @client
  }
`

const Filter = () => {
  const { data: storeData } = useQuery(storeQuery, { suspend: false })
  const exportTaxonomies = get(storeData, 'exportTaxonomies', [])

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

export default Filter
