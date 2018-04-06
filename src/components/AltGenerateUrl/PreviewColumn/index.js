// @flow
import React, { Fragment } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import styled from 'styled-components'
import compose from 'recompose/compose'

import exportTaxonomiesData from '../exportTaxonomiesData'
import OptionsChoosen from './OptionsChoosen'
import Url from './Url'
import ErrorBoundary from '../../shared/ErrorBoundary'

const enhance = compose(exportTaxonomiesData)

const Container = styled.div`
  padding: 5px 0;
`
const HowToDiv = styled.div`
  padding: 15px 10px 0 10px;
`

const Filter = ({ exportTaxonomiesData }: { exportTaxonomiesData: Object }) => (
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

          return (
            <Fragment>
              <OptionsChoosen />
              {fieldsChoosen && <Url />}
              {!fieldsChoosen && (
                <HowToDiv>
                  Sobald eine Eigenschaft gewählt ist, wird hier eine URL
                  generiert.
                </HowToDiv>
              )}
            </Fragment>
          )
        }}
      </Query>
    </Container>
  </ErrorBoundary>
)

export default enhance(Filter)
