// @flow
import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import styled from 'styled-components'

import ErrorBoundary from '../../shared/ErrorBoundary'

const Container = styled.div`
  padding: 5px;
`
const HowToDiv = styled.div`
  padding: 15px 10px 0 10px;
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

            if (!fieldsChoosen) {
              return (
                <HowToDiv>
                  Sobald eine Eigenschaft gewählt ist, wird hier eine URL
                  generiert.
                </HowToDiv>
              )
            }
            const taxProps = exportTaxProperties.map(p => ({
              t: 'tax',
              n: p.taxname,
              p: p.pname,
            }))
            const pcoProps = exportPcoProperties.map(p => ({
              t: 'pco',
              n: p.pcname,
              p: p.pname,
            }))
            const rcoProps = exportRcoProperties.map(p => ({
              t: 'rco',
              n: p.pcname,
              rt: p.relationtype,
              p: p.pname,
            }))
            const props = [...taxProps, ...pcoProps, ...rcoProps]
            const url = `https://artdaten.ch/api/alt?fields=${JSON.stringify(
              props
            )}`
            return <div>{url}</div>
          }}
        </Query>
      </Container>
    </ErrorBoundary>
  )
}

export default Url
