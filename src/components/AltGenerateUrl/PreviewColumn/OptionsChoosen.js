// @flow
import React, { useCallback } from 'react'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'
import compose from 'recompose/compose'
import styled from 'styled-components'
import get from 'lodash/get'
import { useQuery, useApolloClient } from 'react-apollo-hooks'
import gql from 'graphql-tag'

import exportTaxonomiesMutation from '../exportTaxonomiesMutation'
import removeExportPcoPropertyMutation from '../removeExportPcoPropertyMutation'
import exportPcoPropertiesResetMutation from '../exportPcoPropertiesResetMutation'
import removeExportRcoPropertyMutation from '../removeExportRcoPropertyMutation'
import exportRcoPropertiesResetMutation from '../exportRcoPropertiesResetMutation'
import removeExportTaxPropertyMutation from '../removeExportTaxPropertyMutation'
import exportTaxPropertiesResetMutation from '../exportTaxPropertiesResetMutation'
import constants from '../../../modules/constants'
import TaxProperties from './TaxProperties'

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
})
const Container = styled.div`
  margin: 0;
  padding: 8px 8px 0 8px;
  ul {
    margin-left: -20px !important;
  }
  li {
    padding-bottom: 4px;
  }
  ul > li:first-child {
    padding-top: 4px;
  }
`
const Title = styled.div`
  font-weight: bold;
`
const ResetSpan = styled.span`
  margin-left: 8px;
  font-weight: 100;
  font-style: italic;
  cursor: pointer;
  text-decoration: underline dotted rgba(0, 0, 0, 0.3);
`
const StyledButton = styled(Button)`
  border: 1px solid !important;
  margin-left: 0 !important;
  margin-top: 0 !important;
`

const storeQuery = gql`
  query exportTaxonomiesQuery {
    exportTaxonomies @client
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
`

const enhance = compose(withStyles(styles))

const OptionsChoosen = ({ classes }: { classes: Object }) => {
  const client = useApolloClient()

  const { data: storeData } = useQuery(storeQuery, { suspend: false })

  const onClickResetAll = useCallback(() => {
    client.mutate({
      mutation: exportTaxonomiesMutation,
      variables: { value: [] },
    })
    client.mutate({
      mutation: exportPcoPropertiesResetMutation,
      variables: { value: [] },
    })
    client.mutate({
      mutation: exportRcoPropertiesResetMutation,
      variables: { value: [] },
    })
    client.mutate({
      mutation: exportTaxPropertiesResetMutation,
      variables: { value: [] },
    })
  })

  const exportTaxonomies = get(storeData, 'exportTaxonomies', [])
  const exportTaxProperties = get(storeData, 'exportTaxProperties', [])
  const exportPcoProperties = get(storeData, 'exportPcoProperties', [])
  const exportRcoProperties = get(storeData, 'exportRcoProperties', [])
  const noDataChoosen =
    [
      ...exportTaxonomies,
      ...exportTaxProperties,
      ...exportPcoProperties,
      ...exportRcoProperties,
    ].length === 0

  if (noDataChoosen) return null

  return (
    <Container>
      <Title title="Gewählte Optionen">Gewählte Optionen</Title>
      <ul>
        <li>{`Taxonomien (welche das Artenlistentool erwartet): ${constants.altTaxonomies.join(
          ', ',
        )}`}</li>
        {exportRcoProperties.length > 0 && (
          <li>Eigenschaften von Beziehungen mit | getrennt in einer Zeile</li>
        )}
        <li>
          {`Eigenschaften:${
            [
              ...exportTaxProperties,
              ...exportPcoProperties,
              ...exportRcoProperties,
            ].length === 0
              ? ' keine'
              : ''
          }`}
          <ul>
            <TaxProperties properties={exportTaxProperties} />
            {exportPcoProperties.map(({ pcname, pname }, i) => (
              <li key={i}>
                {`${pcname}: ${pname}`}
                <ResetSpan
                  onClick={() => {
                    client.mutate({
                      mutation: removeExportPcoPropertyMutation,
                      variables: {
                        pcname,
                        pname,
                      },
                    })
                  }}
                >
                  zurücksetzen
                </ResetSpan>
              </li>
            ))}
            {exportRcoProperties.map(({ pcname, relationtype, pname }, i) => (
              <li key={i}>
                {`${pcname} - ${relationtype}: ${pname}`}
                <ResetSpan
                  onClick={() => {
                    client.mutate({
                      mutation: removeExportRcoPropertyMutation,
                      variables: {
                        pcname,
                        relationtype,
                        pname,
                      },
                    })
                  }}
                >
                  zurücksetzen
                </ResetSpan>
              </li>
            ))}
          </ul>
        </li>
      </ul>
      <StyledButton className={classes.button} onClick={onClickResetAll}>
        alle Optionen zurücksetzen
      </StyledButton>
    </Container>
  )
}

export default enhance(OptionsChoosen)
