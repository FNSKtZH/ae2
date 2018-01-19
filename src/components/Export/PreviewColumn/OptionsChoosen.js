// @flow
import React from 'react'
import { withApollo } from 'react-apollo'
import { Card, CardHeader, CardText } from 'material-ui/Card'
import Button from 'material-ui-next/Button'
import { withStyles } from 'material-ui-next/styles'
import compose from 'recompose/compose'
import withHandlers from 'recompose/withHandlers'
import styled from 'styled-components'
import get from 'lodash/get'

import exportCategoriesData from '../exportCategoriesData'
import exportCategoriesMutation from '../exportCategoriesMutation'
import exportTaxonomiesData from '../exportTaxonomiesData'
import exportTaxonomiesMutation from '../exportTaxonomiesMutation'
import exportPcoPropertiesData from '../exportPcoPropertiesData'
import exportPcoPropertiesMutation from '../exportPcoPropertiesMutation'
import exportRcoPropertiesData from '../exportRcoPropertiesData'
import exportRcoPropertiesMutation from '../exportRcoPropertiesMutation'
import exportTaxPropertiesData from '../exportTaxPropertiesData'
import exportTaxPropertiesMutation from '../exportTaxPropertiesMutation'
import exportTaxFiltersData from '../exportTaxFiltersData'
import exportTaxFiltersMutation from '../exportTaxFiltersMutation'
import exportPcoFiltersData from '../exportPcoFiltersData'
import exportPcoFiltersMutation from '../exportPcoFiltersMutation'
import exportRcoFiltersData from '../exportRcoFiltersData'
import exportRcoFiltersMutation from '../exportRcoFiltersMutation'
import exportOnlyRowsWithPropertiesData from '../exportOnlyRowsWithPropertiesData'
import exportOnlyRowsWithPropertiesMutation from '../exportOnlyRowsWithPropertiesMutation'
import exportWithSynonymDataData from '../exportWithSynonymDataData'
import exportWithSynonymDataMutation from '../exportWithSynonymDataMutation'
import exportTooManyPropertiesData from '../exportTooManyPropertiesData'
import booleanToJaNein from '../../../modules/booleanToJaNein'

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
})
const level1CardStyle = { margin: '10px 0' }
const level1CardTitleStyle = { fontWeight: 'bold' }
const level1CardHeaderStyle = {}
const level1CardTextStyle = {
  padding: '0 16px !important',
  margin: '-10px 10px -5px 0',
}

const FilterValueSpan = styled.span`
  background-color: #dadada;
  padding: 1px 8px;
  margin-left: 5px;
  border-radius: 3px;
`

const enhance = compose(
  withApollo,
  exportCategoriesData,
  exportCategoriesMutation,
  exportTaxonomiesData,
  exportTaxonomiesMutation,
  exportTaxPropertiesData,
  exportTaxPropertiesMutation,
  exportTaxFiltersData,
  exportTaxFiltersMutation,
  exportPcoPropertiesData,
  exportRcoPropertiesMutation,
  exportPcoPropertiesMutation,
  exportPcoFiltersData,
  exportPcoFiltersMutation,
  exportRcoPropertiesData,
  exportRcoFiltersData,
  exportRcoFiltersMutation,
  exportOnlyRowsWithPropertiesData,
  exportOnlyRowsWithPropertiesMutation,
  exportTooManyPropertiesData,
  exportWithSynonymDataData,
  exportWithSynonymDataMutation,
  withHandlers({
    onClickResetAll: ({
      client,
      exportCategoriesMutation,
      exportTaxonomiesMutation,
      exportPcoPropertiesMutation,
      exportRcoPropertiesMutation,
      exportTaxPropertiesMutation,
      exportTaxFiltersMutation,
      exportPcoFiltersMutation,
      exportRcoFiltersMutation,
      exportOnlyRowsWithPropertiesMutation,
      exportWithSynonymDataMutation,
    }) => () => {
      client.mutate({
        mutation: exportCategoriesMutation,
        variables: { value: [] },
      })
      client.mutate({
        mutation: exportTaxonomiesMutation,
        variables: { value: [] },
      })
      client.mutate({
        mutation: exportPcoPropertiesMutation,
        variables: { value: [] },
      })
      client.mutate({
        mutation: exportRcoPropertiesMutation,
        variables: { value: [] },
      })
      client.mutate({
        mutation: exportTaxPropertiesMutation,
        variables: { value: [] },
      })
      client.mutate({
        mutation: exportTaxFiltersMutation,
        variables: { value: [] },
      })
      client.mutate({
        mutation: exportPcoFiltersMutation,
        variables: { value: [] },
      })
      client.mutate({
        mutation: exportRcoFiltersMutation,
        variables: { value: [] },
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
  }),
  withStyles(styles)
)

const OptionsChoosen = ({
  exportCategoriesData,
  exportTaxonomiesData,
  exportTaxPropertiesData,
  exportTaxFiltersData,
  exportPcoPropertiesData,
  exportPcoFiltersData,
  exportRcoPropertiesData,
  exportRcoFiltersData,
  exportOnlyRowsWithPropertiesData,
  exportWithSynonymDataData,
  classes,
  onClickResetAll,
}: {
  exportCategoriesData: Object,
  exportTaxonomiesData: Object,
  exportTaxPropertiesData: Object,
  exportTaxFiltersData: Object,
  exportPcoPropertiesData: Object,
  exportPcoFiltersData: Object,
  exportRcoPropertiesData: Object,
  exportRcoFiltersData: Object,
  exportOnlyRowsWithPropertiesData: Object,
  exportWithSynonymDataData: Object,
  classes: Object,
  onClickResetAll: () => void,
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
  const exportCategories = get(exportCategoriesData, 'exportCategories', [])
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

  if (noDataChoosen) return null
  return (
    <Card style={level1CardStyle} expanded={true}>
      <CardHeader
        title="Gewählte Optionen"
        actAsExpander={true}
        showExpandableButton={false}
        titleStyle={level1CardTitleStyle}
        style={level1CardHeaderStyle}
      />
      <CardText expandable={true} style={level1CardTextStyle}>
        <Button className={classes.button} onClick={onClickResetAll}>
          alle zurücksetzen
        </Button>
        <ul>
          <li>
            {`Gruppe${exportCategories.length > 1 ? 'n' : ''}: ${
              exportCategories.length === 0
                ? ' keine'
                : exportCategories.join(', ')
            }`}
          </li>
          <li>
            {`Taxonomie${exportTaxonomies.length > 1 ? 'n' : ''}: ${
              exportTaxonomies.length === 0
                ? ' keine'
                : exportTaxonomies.join(', ')
            }`}
          </li>
          <li>{`${
            exportWithSynonymData
              ? 'Informationen von Synonymen mit exportieren'
              : 'Ohne Informationen von Synonymen'
          }`}</li>
          <li>{`${
            exportOnlyRowsWithProperties
              ? 'Nur Datensätze mit Eigenschaften exportieren'
              : 'Auch Datensätze ohne Eigenschaften exportieren'
          }`}</li>
          {exportPcoProperties.length > 0 && <li>Pro Beziehung eine Zeile</li>}
          <li>
            {`Filter:${
              [...exportTaxFilters, ...exportPcoFilters, ...exportRcoFilters]
                .length === 0
                ? ' keine'
                : ''
            }`}
            <ul>
              {exportTaxFilters.map((p, i) => (
                <li key={i}>
                  {`${p.taxname}: ${p.pname} ${
                    p.comparator ? `${p.comparator}` : ''
                  }`}
                  <FilterValueSpan>
                    {typeof p.value === 'boolean'
                      ? booleanToJaNein(p.value)
                      : p.value}
                  </FilterValueSpan>
                </li>
              ))}
              {exportPcoFilters.map((p, i) => (
                <li key={i}>
                  {`${p.pcname}: ${p.pname} ${
                    p.comparator ? `${p.comparator}` : ''
                  }`}
                  <FilterValueSpan>
                    {typeof p.value === 'boolean'
                      ? booleanToJaNein(p.value)
                      : p.value}
                  </FilterValueSpan>
                </li>
              ))}
              {exportRcoFilters.map((p, i) => (
                <li key={i}>
                  {`${p.pcname}: ${p.pname} ${
                    p.comparator ? `${p.comparator}` : ''
                  }`}
                  <FilterValueSpan>
                    {typeof p.value === 'boolean'
                      ? booleanToJaNein(p.value)
                      : p.value}
                  </FilterValueSpan>
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
              {exportTaxProperties.map((p, i) => (
                <li key={i}>{`${p.taxname}: ${p.pname}`}</li>
              ))}
              {exportPcoProperties.map((p, i) => (
                <li key={i}>{`${p.pcname}: ${p.pname}`}</li>
              ))}
              {exportRcoProperties.map((p, i) => (
                <li key={i}>{`${p.pcname}: ${p.pname}`}</li>
              ))}
            </ul>
          </li>
        </ul>
      </CardText>
    </Card>
  )
}

export default enhance(OptionsChoosen)
