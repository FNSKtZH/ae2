// @flow
import React from 'react'
import { withApollo } from 'react-apollo'
import Button from 'material-ui/Button'
import { withStyles } from 'material-ui/styles'
import compose from 'recompose/compose'
import withHandlers from 'recompose/withHandlers'
import withState from 'recompose/withState'
import styled from 'styled-components'
import get from 'lodash/get'

import exportTaxonomiesData from '../exportTaxonomiesData'
import exportTaxonomiesMutation from '../exportTaxonomiesMutation'
import exportPcoPropertiesData from '../exportPcoPropertiesData'
import removeExportPcoPropertyMutation from '../removeExportPcoPropertyMutation'
import exportPcoPropertiesResetMutation from '../exportPcoPropertiesResetMutation'
import exportRcoPropertiesData from '../exportRcoPropertiesData'
import removeExportRcoPropertyMutation from '../removeExportRcoPropertyMutation'
import exportRcoPropertiesResetMutation from '../exportRcoPropertiesResetMutation'
import exportTaxPropertiesData from '../exportTaxPropertiesData'
import removeExportTaxPropertyMutation from '../removeExportTaxPropertyMutation'
import exportTaxPropertiesResetMutation from '../exportTaxPropertiesResetMutation'
import exportOnlyRowsWithPropertiesData from '../exportOnlyRowsWithPropertiesData'
import exportOnlyRowsWithPropertiesMutation from '../exportOnlyRowsWithPropertiesMutation'
import exportWithSynonymDataData from '../exportWithSynonymDataData'
import exportWithSynonymDataMutation from '../exportWithSynonymDataMutation'
import exportTooManyPropertiesData from '../exportTooManyPropertiesData'
import exportRcoInOneRowData from '../exportRcoInOneRowData'

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

const enhance = compose(
  withApollo,
  exportTaxonomiesData,
  exportTaxPropertiesData,
  exportPcoPropertiesData,
  exportRcoPropertiesData,
  exportOnlyRowsWithPropertiesData,
  exportTooManyPropertiesData,
  exportRcoInOneRowData,
  exportWithSynonymDataData,
  withHandlers({
    onClickResetAll: ({ client }) => () => {
      client.mutate({
        mutation: exportTaxonomiesMutation,
        variables: { value: [] },
      })
      client.mutate({
        mutation: exportPcoPropertiesResetMutation,
      })
      client.mutate({
        mutation: exportRcoPropertiesResetMutation,
      })
      client.mutate({
        mutation: exportTaxPropertiesResetMutation,
      })
      client.mutate({
        mutation: exportOnlyRowsWithPropertiesMutation,
        variables: { value: true },
      })
      client.mutate({
        mutation: exportWithSynonymDataMutation,
        variables: { value: true },
      })
    },
    onClickResetExportWithSynonymData: ({ client }) => () => {
      client.mutate({
        mutation: exportWithSynonymDataMutation,
        variables: { value: true },
      })
    },
    onClickResetExportOnlyRowsWithProperties: ({ client }) => () => {
      client.mutate({
        mutation: exportOnlyRowsWithPropertiesMutation,
        variables: { value: true },
      })
    },
  }),
  withState('expanded', 'setExpanded', true),
  withStyles(styles)
)

const OptionsChoosen = ({
  client,
  expanded,
  setExpanded,
  exportTaxonomiesData,
  exportTaxPropertiesData,
  exportPcoPropertiesData,
  exportRcoPropertiesData,
  exportOnlyRowsWithPropertiesData,
  exportWithSynonymDataData,
  exportRcoInOneRowData,
  classes,
  onClickResetAll,
  onClickResetExportWithSynonymData,
  onClickResetExportOnlyRowsWithProperties,
}: {
  client: Object,
  expanded: Boolean,
  setExpanded: () => void,
  exportTaxonomiesData: Object,
  exportTaxPropertiesData: Object,
  exportPcoPropertiesData: Object,
  exportRcoPropertiesData: Object,
  exportOnlyRowsWithPropertiesData: Object,
  exportWithSynonymDataData: Object,
  exportRcoInOneRowData: Object,
  classes: Object,
  onClickResetAll: () => void,
  onClickResetExportWithSynonymData: () => void,
  onClickResetExportOnlyRowsWithProperties: () => void,
}) => {
  const exportWithSynonymData = get(
    exportWithSynonymDataData,
    'exportWithSynonymData',
    true
  )
  const exportOnlyRowsWithProperties = get(
    exportOnlyRowsWithPropertiesData,
    'exportOnlyRowsWithProperties',
    true
  )
  const exportTaxonomies = get(exportTaxonomiesData, 'exportTaxonomies', [])
  const exportTaxProperties = get(
    exportTaxPropertiesData,
    'exportTaxProperties',
    []
  )
  const exportPcoProperties = get(
    exportPcoPropertiesData,
    'exportPcoProperties',
    []
  )
  const exportRcoProperties = get(
    exportRcoPropertiesData,
    'exportRcoProperties',
    []
  )
  const noDataChoosen =
    [
      ...exportTaxonomies,
      ...exportTaxProperties,
      ...exportPcoProperties,
      ...exportRcoProperties,
    ].length === 0
  const exportRcoInOneRow = get(
    exportRcoInOneRowData,
    'exportRcoInOneRow',
    true
  )

  if (noDataChoosen) return null
  return (
    <Container>
      <Title title="Gewählte Optionen">Gewählte Optionen</Title>
      <ul>
        <li>
          {`Taxonomie${exportTaxonomies.length > 1 ? 'n' : ''}: ${
            exportTaxonomies.length === 0
              ? ' keine'
              : exportTaxonomies.join(', ')
          }`}
        </li>
        <li>
          {`${
            exportWithSynonymData
              ? 'Informationen von Synonymen mit exportieren'
              : 'Ohne Informationen von Synonymen'
          }`}
          {!exportWithSynonymData && (
            <ResetSpan onClick={onClickResetExportWithSynonymData}>
              zurücksetzen
            </ResetSpan>
          )}
        </li>
        <li>
          {`${
            exportOnlyRowsWithProperties
              ? 'Nur Datensätze mit Eigenschaften exportieren'
              : 'Auch Datensätze ohne Eigenschaften exportieren'
          }`}
          {!exportOnlyRowsWithProperties && (
            <ResetSpan onClick={onClickResetExportOnlyRowsWithProperties}>
              zurücksetzen
            </ResetSpan>
          )}
        </li>
        {exportRcoProperties.length > 0 &&
          exportRcoInOneRow && (
            <li>Eigenschaften von Beziehungen mit | getrennt in einer Zeile</li>
          )}
        {exportRcoProperties.length > 0 &&
          !exportRcoInOneRow && (
            <li>Für jede Beziehung wird eine Zeile erstellt</li>
          )}
        <li>
          {`Eigenschaften:${
            [
              ...exportTaxProperties,
              ...exportPcoProperties,
              ...exportRcoProperties,
            ].length === 0
              ? ' keine (die id kommt immer mit)'
              : ' (die id kommt immer mit)'
          }`}
          <ul>
            {exportTaxProperties.map(({ taxname, pname }, i) => (
              <li key={i}>
                {`${taxname}: ${pname}`}
                <ResetSpan
                  onClick={() => {
                    client.mutate({
                      mutation: removeExportTaxPropertyMutation,
                      variables: {
                        taxname,
                        pname,
                      },
                    })
                  }}
                >
                  zurücksetzen
                </ResetSpan>
              </li>
            ))}
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
