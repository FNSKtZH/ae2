// @flow
import React from 'react'
import { Card, CardHeader, CardText } from 'material-ui/Card'
import { graphql } from 'react-apollo'
import styled from 'styled-components'
import compose from 'recompose/compose'
import withState from 'recompose/withState'
import withHandlers from 'recompose/withHandlers'
//import get from 'lodash/get'

import Categories from './Categories'
import Properties from './Properties'
import Filter from './Filter'
import exportCategoriesGql from '../../modules/exportCategoriesGql'

const Level1Card = styled(Card)`
  margin: 10px 0;
`
const Level1CardHeader = styled(CardHeader)`
  background-color: #ffcc80;
`
const Level1CardText = styled(CardText)`
  padding: 0 !important;
`
const level1CardTitleStyle = { fontWeight: 'bold' }

const Container = styled.div`
  padding: 5px 10px;
  height: calc(100% - 48px);
  overflow: auto !important;
`
const StyledH3 = styled.h3`
  margin: 5px 0;
`
const exportCategoriesData = graphql(exportCategoriesGql, {
  name: 'exportCategoriesData',
})

const enhance = compose(
  exportCategoriesData,
  withState('groupsExpanded', 'setGroupsExpanded', true),
  withState('filterExpanded', 'setFilterExpanded', false),
  withState('propertiesExpanded', 'setPropertiesExpanded', false),
  withState('exportExpanded', 'setExportExpanded', false),
  withHandlers({
    onToggleGroups: ({
      exportCategoriesData,
      groupsExpanded,
      setGroupsExpanded,
      setFilterExpanded,
      setPropertiesExpanded,
      setExportExpanded,
    }) => () => {
      setGroupsExpanded(!groupsExpanded)
      // close all others
      setFilterExpanded(false)
      setPropertiesExpanded(false)
      setExportExpanded(false)
    },
    onToggleFilter: ({
      exportCategoriesData,
      filterExpanded,
      setGroupsExpanded,
      setFilterExpanded,
      setPropertiesExpanded,
      setExportExpanded,
    }) => () => {
      const { exportCategories } = exportCategoriesData
      if (
        !filterExpanded &&
        !!exportCategories &&
        exportCategories.length > 0
      ) {
        setFilterExpanded(true)
      } else {
        setFilterExpanded(false)
      }
      // close all others
      setGroupsExpanded(false)
      setPropertiesExpanded(false)
      setExportExpanded(false)
    },
    onToggleProperties: ({
      exportCategoriesData,
      propertiesExpanded,
      setGroupsExpanded,
      setFilterExpanded,
      setPropertiesExpanded,
      setExportExpanded,
    }) => () => {
      const { exportCategories } = exportCategoriesData
      if (
        !propertiesExpanded &&
        !!exportCategories &&
        exportCategories.length > 0
      ) {
        setPropertiesExpanded(true)
      } else {
        setPropertiesExpanded(false)
      }
      // close all others
      setGroupsExpanded(false)
      setFilterExpanded(false)
      setExportExpanded(false)
    },
    onToggleExport: ({
      exportCategoriesData,
      exportExpanded,
      setGroupsExpanded,
      setFilterExpanded,
      setPropertiesExpanded,
      setExportExpanded,
    }) => () => {
      const { exportCategories } = exportCategoriesData
      if (
        !exportExpanded &&
        !!exportCategories &&
        exportCategories.length > 0
      ) {
        setExportExpanded(true)
      } else {
        setExportExpanded(false)
      }
      // close all others
      setGroupsExpanded(false)
      setFilterExpanded(false)
      setPropertiesExpanded(false)
    },
  })
)

const Export = ({
  data,
  exportCategoriesData,
  groupsExpanded,
  filterExpanded,
  propertiesExpanded,
  exportExpanded,
  onToggleGroups,
  onToggleFilter,
  onToggleProperties,
  onToggleExport,
}: {
  data: Object,
  exportCategoriesData: Object,
  groupsExpanded: Boolean,
  filterExpanded: Boolean,
  propertiesExpanded: Boolean,
  exportExpanded: Boolean,
  onToggleGroups: () => {},
  onToggleFilter: () => {},
  onToggleProperties: () => {},
  onToggleExport: () => {},
}) => {
  //console.log('Export: data:', data)
  //const pcoProperties = get(data, 'pcoPropertiesByCategoriesFunction.nodes', [])
  //console.log('Export: pcoProperties:', pcoProperties)
  //const rcoProperties = get(data, 'rcoPropertiesByCategoriesFunction.nodes', [])
  //console.log('Export: rcoProperties:', rcoProperties)
  //const taxProperties = get(data, 'taxPropertiesByCategoriesFunction.nodes', [])
  //console.log('Export: taxProperties:', taxProperties)

  return (
    <Container>
      <StyledH3>Export</StyledH3>
      <Level1Card expanded={groupsExpanded} onExpandChange={onToggleGroups}>
        <Level1CardHeader
          title="1. Gruppe(n) wählen"
          actAsExpander={true}
          showExpandableButton={true}
          titleStyle={level1CardTitleStyle}
        />
        <Level1CardText expandable={true}>
          <Categories data={data} />
        </Level1CardText>
      </Level1Card>
      <Level1Card expanded={filterExpanded} onExpandChange={onToggleFilter}>
        <Level1CardHeader
          title="2. filtern"
          actAsExpander={true}
          showExpandableButton={true}
          titleStyle={level1CardTitleStyle}
        />
        <Level1CardText expandable={true}>
          <Filter data={data} />
        </Level1CardText>
      </Level1Card>
      <Level1Card
        expanded={propertiesExpanded}
        onExpandChange={onToggleProperties}
      >
        <Level1CardHeader
          title="3. Eigenschaften wählen"
          actAsExpander={true}
          showExpandableButton={true}
          titleStyle={level1CardTitleStyle}
        />
        <Level1CardText expandable={true}>
          <Properties data={data} />
        </Level1CardText>
      </Level1Card>
      <Level1Card expanded={exportExpanded} onExpandChange={onToggleExport}>
        <Level1CardHeader
          title="4. exportieren"
          actAsExpander={true}
          showExpandableButton={true}
          titleStyle={level1CardTitleStyle}
        />
        <Level1CardText expandable={true}>card text exportieren</Level1CardText>
      </Level1Card>
    </Container>
  )
}

export default enhance(Export)
