// @flow
import React, { useCallback, useContext } from 'react'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'
import compose from 'recompose/compose'
import styled from 'styled-components'
import get from 'lodash/get'
import { useQuery, useApolloClient } from 'react-apollo-hooks'
import gql from 'graphql-tag'
import { observer } from 'mobx-react-lite'

import exportPcoPropertiesResetMutation from '../../exportPcoPropertiesResetMutation'
import exportRcoPropertiesResetMutation from '../../exportRcoPropertiesResetMutation'
import exportTaxPropertiesResetMutation from '../../exportTaxPropertiesResetMutation'
import exportTaxFiltersResetMutation from '../../exportTaxFiltersResetMutation'
import exportPcoFiltersResetMutation from '../../exportPcoFiltersResetMutation'
import exportRcoFiltersResetMutation from '../../exportRcoFiltersResetMutation'
import exportWithSynonymDataMutation from '../../exportWithSynonymDataMutation'
import TaxFilterItems from './TaxFilterItems'
import PcoFilterItems from './PcoFilterItems'
import RcoFilterItems from './RcoFilterItems'
import TaxPropertiesItems from './TaxPropertiesItems'
import PcoPropertiesItems from './PcoPropertiesItems'
import RcoPropertiesItems from './RcoPropertiesItems'
import mobxStoreContext from '../../../../mobxStoreContext'

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
  query exportTypeQuery {
    exportTaxProperties @client {
      taxname
      pname
    }
    exportTaxFilters @client {
      taxname
      pname
      comparator
      value
    }
    exportPcoFilters @client {
      pcname
      pname
      comparator
      value
    }
    exportRcoProperties @client {
      pcname
      relationtype
      pname
    }
    exportRcoFilters @client {
      pcname
      pname
      relationtype
      comparator
      value
    }
    exportRcoInOneRow @client
    exportWithSynonymData @client
  }
`

const enhance = compose(
  withStyles(styles),
  observer,
)

const OptionsChoosen = ({ classes }: { classes: Object }) => {
  const client = useApolloClient()
  const mobxStore = useContext(mobxStoreContext)
  const {
    setType,
    type: exportType,
    setTaxonomies,
    onlyRowsWithProperties: exportOnlyRowsWithProperties,
    setOnlyRowsWithProperties,
  } = mobxStore.export
  const exportTaxonomies = mobxStore.export.taxonomies.toJSON()

  const { data: storeData } = useQuery(storeQuery, { suspend: false })

  const exportWithSynonymData = get(storeData, 'exportWithSynonymData', true)
  const exportTaxProperties = get(storeData, 'exportTaxProperties', [])
  const exportTaxFilters = get(storeData, 'exportTaxFilters', [])
  const exportPcoProperties = get(storeData, 'exportPcoProperties', [])
  const exportPcoFilters = get(storeData, 'exportPcoFilters', [])
  const exportRcoProperties = get(storeData, 'exportRcoProperties', [])
  const exportRcoFilters = get(storeData, 'exportRcoFilters', [])
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
  const exportRcoInOneRow = get(storeData, 'exportRcoInOneRow', true)

  const onClickResetAll = useCallback(() => {
    setType([])
    setTaxonomies([])
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
    setOnlyRowsWithProperties(true)
    client.mutate({
      mutation: exportWithSynonymDataMutation,
      variables: { value: true },
    })
  })
  const onClickResetType = useCallback(() => {
    setType([])
    setTaxonomies([])
  })
  const onClickResetTaxonomies = useCallback(() => {
    setTaxonomies([])
  })
  const onClickResetExportWithSynonymData = useCallback(() => {
    client.mutate({
      mutation: exportWithSynonymDataMutation,
      variables: { value: true },
    })
  })
  const onClickResetExportOnlyRowsWithProperties = useCallback(() => {
    setOnlyRowsWithProperties(true)
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
            <TaxFilterItems exportTaxFilters={exportTaxFilters} />
            <PcoFilterItems exportPcoFilters={exportPcoFilters} />
            <RcoFilterItems exportRcoFilters={exportRcoFilters} />
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
            <TaxPropertiesItems exportTaxProperties={exportTaxProperties} />
            <PcoPropertiesItems exportPcoProperties={exportPcoProperties} />
            <RcoPropertiesItems exportRcoProperties={exportRcoProperties} />
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
