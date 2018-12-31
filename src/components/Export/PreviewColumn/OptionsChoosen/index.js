// @flow
import React, { useCallback } from 'react'
import { withApollo } from 'react-apollo'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'
import compose from 'recompose/compose'
import styled from 'styled-components'
import get from 'lodash/get'

import withExportTypeData from '../../withExportTypeData'
import exportTypeMutation from '../../exportTypeMutation'
import withExportTaxonomiesData from '../../withExportTaxonomiesData'
import exportTaxonomiesMutation from '../../exportTaxonomiesMutation'
import withExportPcoPropertiesData from '../../withExportPcoPropertiesData'
import exportPcoPropertiesResetMutation from '../../exportPcoPropertiesResetMutation'
import withExportRcoPropertiesData from '../../withExportRcoPropertiesData'
import exportRcoPropertiesResetMutation from '../../exportRcoPropertiesResetMutation'
import withExportTaxPropertiesData from '../../withExportTaxPropertiesData'
import exportTaxPropertiesResetMutation from '../../exportTaxPropertiesResetMutation'
import withExportTaxFiltersData from '../../withExportTaxFiltersData'
import exportTaxFiltersResetMutation from '../../exportTaxFiltersResetMutation'
import withExportPcoFiltersData from '../../withExportPcoFiltersData'
import exportPcoFiltersResetMutation from '../../exportPcoFiltersResetMutation'
import withExportRcoFiltersData from '../../withExportRcoFiltersData'
import exportRcoFiltersResetMutation from '../../exportRcoFiltersResetMutation'
import withExportOnlyRowsWithPropertiesData from '../../withExportOnlyRowsWithPropertiesData'
import exportOnlyRowsWithPropertiesMutation from '../../exportOnlyRowsWithPropertiesMutation'
import withExportWithSynonymDataData from '../../withExportWithSynonymDataData'
import exportWithSynonymDataMutation from '../../exportWithSynonymDataMutation'
import withExportTooManyPropertiesData from '../../withExportTooManyPropertiesData'
import withExportRcoInOneRowData from '../../withExportRcoInOneRowData'
import ExportTaxFilterListItems from './ExportTaxFilterListItems'
import ExportPcoFilterListItems from './ExportPcoFilterListItems'
import ExportRcoFilterListItems from './ExportRcoFilterListItems'
import ExportTaxPropertiesListItems from './ExportTaxPropertiesListItems'
import ExportPcoPropertiesListItems from './ExportPcoPropertiesListItems'
import ExportRcoPropertiesListItems from './ExportRcoPropertiesListItems'

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
  withExportTypeData,
  withExportTaxonomiesData,
  withExportTaxPropertiesData,
  withExportTaxFiltersData,
  withExportPcoPropertiesData,
  withExportPcoFiltersData,
  withExportRcoPropertiesData,
  withExportRcoFiltersData,
  withExportOnlyRowsWithPropertiesData,
  withExportTooManyPropertiesData,
  withExportRcoInOneRowData,
  withExportWithSynonymDataData,
  withStyles(styles),
)

const OptionsChoosen = ({
  client,
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
}: {
  client: Object,
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
}) => {
  const exportWithSynonymData = get(
    exportWithSynonymDataData,
    'exportWithSynonymData',
    true,
  )
  const exportOnlyRowsWithProperties = get(
    exportOnlyRowsWithPropertiesData,
    'exportOnlyRowsWithProperties',
    true,
  )
  const exportType = get(exportTypeData, 'exportType', null)
  const exportTaxonomies = get(exportTaxonomiesData, 'exportTaxonomies', [])
  const exportTaxProperties = get(
    exportTaxPropertiesData,
    'exportTaxProperties',
    [],
  )
  const exportTaxFilters = get(exportTaxFiltersData, 'exportTaxFilters', [])
  const exportPcoProperties = get(
    exportPcoPropertiesData,
    'exportPcoProperties',
    [],
  )
  const exportPcoFilters = get(exportPcoFiltersData, 'exportPcoFilters', [])
  const exportRcoProperties = get(
    exportRcoPropertiesData,
    'exportRcoProperties',
    [],
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
    true,
  )

  const onClickResetAll = useCallback(() => {
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
  })
  const onClickResetType = useCallback(() => {
    client.mutate({
      mutation: exportTypeMutation,
      variables: { value: [] },
    })
    client.mutate({
      mutation: exportTaxonomiesMutation,
      variables: { value: [] },
    })
  })
  const onClickResetTaxonomies = useCallback(() => {
    client.mutate({
      mutation: exportTaxonomiesMutation,
      variables: { value: [] },
    })
  })
  const onClickResetExportWithSynonymData = useCallback(() => {
    client.mutate({
      mutation: exportWithSynonymDataMutation,
      variables: { value: true },
    })
  })
  const onClickResetExportOnlyRowsWithProperties = useCallback(() => {
    client.mutate({
      mutation: exportOnlyRowsWithPropertiesMutation,
      variables: { value: true },
    })
  })

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
        {exportRcoProperties.length > 0 && exportRcoInOneRow && (
          <li>Eigenschaften von Beziehungen mit | getrennt in einer Zeile</li>
        )}
        {exportRcoProperties.length > 0 && !exportRcoInOneRow && (
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
            <ExportTaxFilterListItems exportTaxFilters={exportTaxFilters} />
            <ExportPcoFilterListItems exportPcoFilters={exportPcoFilters} />
            <ExportRcoFilterListItems exportRcoFilters={exportRcoFilters} />
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
            <ExportTaxPropertiesListItems
              exportTaxProperties={exportTaxProperties}
            />
            <ExportPcoPropertiesListItems
              exportPcoProperties={exportPcoProperties}
            />
            <ExportRcoPropertiesListItems
              exportRcoProperties={exportRcoProperties}
            />
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
