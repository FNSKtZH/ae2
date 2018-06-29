// @flow
import React from 'react'
import { withApollo } from 'react-apollo'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'
import compose from 'recompose/compose'
import withHandlers from 'recompose/withHandlers'
import withState from 'recompose/withState'
import styled from 'styled-components'
import get from 'lodash/get'

import exportTypeData from '../exportTypeData'
import exportTypeMutation from '../exportTypeMutation'
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
import exportTaxFiltersData from '../exportTaxFiltersData'
import exportTaxFiltersResetMutation from '../exportTaxFiltersResetMutation'
import exportTaxFiltersMutation from '../exportTaxFiltersMutation'
import exportPcoFiltersData from '../exportPcoFiltersData'
import exportPcoFiltersResetMutation from '../exportPcoFiltersResetMutation'
import exportPcoFiltersMutation from '../exportPcoFiltersMutation'
import exportRcoFiltersData from '../exportRcoFiltersData'
import exportRcoFiltersMutation from '../exportRcoFiltersMutation'
import exportRcoFiltersResetMutation from '../exportRcoFiltersResetMutation'
import exportOnlyRowsWithPropertiesData from '../exportOnlyRowsWithPropertiesData'
import exportOnlyRowsWithPropertiesMutation from '../exportOnlyRowsWithPropertiesMutation'
import exportWithSynonymDataData from '../exportWithSynonymDataData'
import exportWithSynonymDataMutation from '../exportWithSynonymDataMutation'
import exportTooManyPropertiesData from '../exportTooManyPropertiesData'
import exportRcoInOneRowData from '../exportRcoInOneRowData'
import booleanToJaNein from '../../../modules/booleanToJaNein'

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
const FilterValueSpan = styled.span`
  background-color: #dadada;
  padding: 1px 8px;
  margin-left: 5px;
  border-radius: 3px;
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
  exportTypeData,
  exportTaxonomiesData,
  exportTaxPropertiesData,
  exportTaxFiltersData,
  exportPcoPropertiesData,
  exportPcoFiltersData,
  exportRcoPropertiesData,
  exportRcoFiltersData,
  exportOnlyRowsWithPropertiesData,
  exportTooManyPropertiesData,
  exportRcoInOneRowData,
  exportWithSynonymDataData,
  withHandlers({
    onClickResetAll: ({ client }) => () => {
      client.mutate({
        mutation: exportTypeMutation,
        variables: { value: [] },
      })
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
        mutation: exportTaxFiltersResetMutation,
      })
      client.mutate({
        mutation: exportPcoFiltersResetMutation,
      })
      client.mutate({
        mutation: exportRcoFiltersResetMutation,
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
    onClickResetType: ({ client }) => () => {
      client.mutate({
        mutation: exportTypeMutation,
        variables: { value: [] },
      })
      client.mutate({
        mutation: exportTaxonomiesMutation,
        variables: { value: [] },
      })
    },
    onClickResetTaxonomies: ({ client }) => () => {
      client.mutate({
        mutation: exportTaxonomiesMutation,
        variables: { value: [] },
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
  exportTypeData,
  exportTaxonomiesData,
  exportTaxPropertiesData,
  exportTaxFiltersData,
  exportPcoPropertiesData,
  exportPcoFiltersData,
  exportRcoPropertiesData,
  exportRcoFiltersData,
  exportOnlyRowsWithPropertiesData,
  exportWithSynonymDataData,
  exportRcoInOneRowData,
  classes,
  onClickResetAll,
  onClickResetTaxonomies,
  onClickResetType,
  onClickResetExportWithSynonymData,
  onClickResetExportOnlyRowsWithProperties,
}: {
  client: Object,
  expanded: Boolean,
  setExpanded: () => void,
  exportTypeData: Object,
  exportTaxonomiesData: Object,
  exportTaxPropertiesData: Object,
  exportTaxFiltersData: Object,
  exportPcoPropertiesData: Object,
  exportPcoFiltersData: Object,
  exportRcoPropertiesData: Object,
  exportRcoFiltersData: Object,
  exportOnlyRowsWithPropertiesData: Object,
  exportWithSynonymDataData: Object,
  exportRcoInOneRowData: Object,
  classes: Object,
  onClickResetAll: () => void,
  onClickResetTaxonomies: () => void,
  onClickResetType: () => void,
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
  const exportType = get(exportTypeData, 'exportType', null)
  const exportTaxonomies = get(exportTaxonomiesData, 'exportTaxonomies', [])
  const exportTaxProperties = get(
    exportTaxPropertiesData,
    'exportTaxProperties',
    []
  )
  const exportTaxFilters = get(exportTaxFiltersData, 'exportTaxFilters', [])
  const exportPcoProperties = get(
    exportPcoPropertiesData,
    'exportPcoProperties',
    []
  )
  const exportPcoFilters = get(exportPcoFiltersData, 'exportPcoFilters', [])
  const exportRcoProperties = get(
    exportRcoPropertiesData,
    'exportRcoProperties',
    []
  )
  const exportRcoFilters = get(exportRcoFiltersData, 'exportRcoFilters', [])
  const noDataChoosen =
    [
      ...exportTaxonomies,
      ...exportTaxProperties,
      ...exportPcoProperties,
      ...exportRcoProperties,
      ...exportTaxFilters,
      ...exportPcoFilters,
      ...exportRcoFilters,
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
          {`Typ: ${!exportType ? ' keiner' : exportType}`}
          {!!exportType && (
            <ResetSpan onClick={onClickResetType}>zurücksetzen</ResetSpan>
          )}
        </li>
        <li>
          {`Taxonomie${exportTaxonomies.length > 1 ? 'n' : ''}: ${
            exportTaxonomies.length === 0
              ? ' keine'
              : exportTaxonomies.join(', ')
          }`}
          {exportTaxonomies.length > 0 && (
            <ResetSpan onClick={onClickResetTaxonomies}>zurücksetzen</ResetSpan>
          )}
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
          {`Filter:${
            [...exportTaxFilters, ...exportPcoFilters, ...exportRcoFilters]
              .length === 0
              ? ' keine'
              : ''
          }`}
          <ul>
            {exportTaxFilters.map(
              ({ taxname, pname, comparator, value }, i) => (
                <li key={i}>
                  {`${taxname}: ${pname} ${comparator ? `${comparator}` : ''}`}
                  <FilterValueSpan>
                    {typeof value === 'boolean'
                      ? booleanToJaNein(value)
                      : value}
                  </FilterValueSpan>
                  <ResetSpan
                    onClick={() => {
                      client.mutate({
                        mutation: exportTaxFiltersMutation,
                        variables: {
                          taxname,
                          pname,
                          comparator: '',
                          value: '',
                        },
                      })
                    }}
                  >
                    zurücksetzen
                  </ResetSpan>
                </li>
              )
            )}
            {exportPcoFilters.map(({ pcname, pname, comparator, value }, i) => (
              <li key={i}>
                {`${pcname}: ${pname} ${comparator ? `${comparator}` : ''}`}
                <FilterValueSpan>
                  {typeof value === 'boolean' ? booleanToJaNein(value) : value}
                </FilterValueSpan>
                <ResetSpan
                  onClick={() => {
                    client.mutate({
                      mutation: exportPcoFiltersMutation,
                      variables: {
                        pcname,
                        pname,
                        comparator: '',
                        value: '',
                      },
                    })
                  }}
                >
                  zurücksetzen
                </ResetSpan>
              </li>
            ))}
            {exportRcoFilters.map(({ pcname, relationtype, pname, comparator, value }, i) => (
              <li key={i}>
                {`${pcname}: ${pname} ${comparator ? `${comparator}` : ''}`}
                <FilterValueSpan>
                  {typeof value === 'boolean' ? booleanToJaNein(value) : value}
                </FilterValueSpan>
                <ResetSpan
                  onClick={() => {
                    client.mutate({
                      mutation: exportRcoFiltersMutation,
                      variables: {
                        pcname,
                        relationtype,
                        pname,
                        comparator: '',
                        value: '',
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
