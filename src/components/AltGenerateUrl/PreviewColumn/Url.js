// @flow
import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import styled from 'styled-components'

import ErrorBoundary from '../../shared/ErrorBoundary'

const Container = styled.div`
  padding-top: 5px;
`

const Url = () => {
  return (
    <ErrorBoundary>
      <Container>
        <Query
          query={gql`
            {
              exportTaxProperties @client {
                taxname
                pname
              }
              exportPcoProperties @client {
                pcname
                pname
              }
              exportRcoProperties @client {
                pcname
                relationtype
                pname
              }
            }
          `}
        >
          {({ loading, error, data }) => {
            if (loading) return 'Lade daten...'
            if (error) return `Fehler: ${error.message}`
            const {
              exportTaxProperties,
              exportPcoProperties,
              exportRcoProperties,
            } = data
            const fieldsChoosen =
              [
                ...exportTaxProperties,
                ...exportPcoProperties,
                ...exportRcoProperties,
              ].length > 0

            return <div>TODO</div>
          }}
        </Query>
      </Container>
    </ErrorBoundary>
  )
}

export default Url
