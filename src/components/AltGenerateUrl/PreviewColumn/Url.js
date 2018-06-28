// @flow
import React, { Fragment } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import styled from 'styled-components'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import copy from 'copy-to-clipboard'
import compose from 'recompose/compose'
import withState from 'recompose/withState'

import ErrorBoundary from '../../shared/ErrorBoundary'

const Container = styled.div`
  padding: 5px;
  padding-bottom: 10px;
`
const InfoDiv = styled.div`
  padding: 15px 10px 0 10px;
`
const StyledButton = styled(Button)`
  border: 1px solid !important;
  margin-left: 0 !important;
  margin-top: 0 !important;
`
const StyledTextField = styled(TextField)`
  padding: 8px 0 !important;
`

const enhance = compose(
  withState('copyButtonText', 'setCopyButtonText', 'url kopieren'),
)

const Url = ({
  copyButtonText,
  setCopyButtonText, 
}:{
  copyButtonText: String,
  setCopyButtonText: () => void,
}) =>
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
              <InfoDiv>
                Sobald eine Eigenschaft gewählt ist, wird hier eine URL
                generiert.
              </InfoDiv>
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
          const url = `https://arteigenschaften.ch/api/alt?fields=${JSON.stringify(
            props
          )}`
          return (
            <Fragment>
              <StyledTextField
                label="URL"
                value={url}
                multiline
                fullWidth
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck="false"
              />
              <StyledButton onClick={() => {
                  setCopyButtonText('kopiert')
                  setTimeout(() => setCopyButtonText('url kopieren'), 3000)
                  copy(url)
                }}
              >
                {copyButtonText}
              </StyledButton>
            </Fragment>
          )
        }}
      </Query>
    </Container>
  </ErrorBoundary>

export default enhance(Url)
