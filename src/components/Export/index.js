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
import exportCategoriesGql from '../../modules/exportCategoriesGql'

const level1CardStyle = { margin: '10px 0' }
const level1CardTitleStyle = { fontWeight: 'bold' }
const level1CardHeaderStyle = { backgroundColor: '#FFCC80' }
const level1CardTextStyle = { padding: 0 }

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
    onToggleFilter: ({
      exportCategoriesData,
      filterExpanded,
      setFilterExpanded,
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
  toggleGroupsExpanded,
  onToggleFilter,
  togglePropertiesExpanded,
  toggleExportExpanded,
}: {
  data: Object,
  exportCategoriesData: Object,
  groupsExpanded: Boolean,
  filterExpanded: Boolean,
  propertiesExpanded: Boolean,
  exportExpanded: Boolean,
  toggleGroupsExpanded: () => {},
  onToggleFilter: () => {},
  togglePropertiesExpanded: () => {},
  toggleExportExpanded: () => {},
}) => {
  //console.log('Export: data:', data)
  //const pcoProperties = get(data, 'pcoPropertiesByCategoriesFunction.nodes', [])
  //console.log('Export: pcoProperties:', pcoProperties)
  //const rcoProperties = get(data, 'rcoPropertiesByCategoriesFunction.nodes', [])
  //console.log('Export: rcoProperties:', rcoProperties)
  //const taxProperties = get(data, 'taxPropertiesByCategoriesFunction.nodes', [])
  //console.log('Export: taxProperties:', taxProperties)
  const { exportCategories } = exportCategoriesData
  console.log('Export: exportCategories:', exportCategories)
  const filterAndPropertiesExpandable =
    !!exportCategories && exportCategories.length > 0
  console.log(
    'Export: filterAndPropertiesExpandable:',
    filterAndPropertiesExpandable
  )

  return (
    <Container>
      <StyledH3>Export</StyledH3>
      <Card
        expanded={groupsExpanded}
        onExpandChange={toggleGroupsExpanded}
        style={level1CardStyle}
      >
        <CardHeader
          title="1. Gruppe(n) wählen"
          actAsExpander={true}
          showExpandableButton={true}
          titleStyle={level1CardTitleStyle}
          style={level1CardHeaderStyle}
        />
        <CardText expandable={true} style={level1CardTextStyle}>
          <Categories data={data} />
        </CardText>
      </Card>
      <Card
        expanded={filterExpanded}
        onExpandChange={onToggleFilter}
        style={level1CardStyle}
      >
        <CardHeader
          title="2. filtern"
          actAsExpander={true}
          showExpandableButton={true}
          titleStyle={level1CardTitleStyle}
          style={level1CardHeaderStyle}
        />
        <CardText expandable={true} style={level1CardTextStyle}>
          card text filtern
        </CardText>
      </Card>
      <Card
        expanded={propertiesExpanded}
        onExpandChange={() => {
          if (filterAndPropertiesExpandable) togglePropertiesExpanded()
        }}
        style={level1CardStyle}
      >
        <CardHeader
          title="3. Eigenschaften wählen"
          actAsExpander={true}
          showExpandableButton={true}
          titleStyle={level1CardTitleStyle}
          style={level1CardHeaderStyle}
        />
        <CardText expandable={true} style={level1CardTextStyle}>
          <Properties data={data} />
        </CardText>
      </Card>
      <Card
        expanded={exportExpanded}
        onExpandChange={() => {
          if (filterAndPropertiesExpandable) toggleExportExpanded()
        }}
        style={level1CardStyle}
      >
        <CardHeader
          title="4. exportieren"
          actAsExpander={true}
          showExpandableButton={true}
          titleStyle={level1CardTitleStyle}
          style={level1CardHeaderStyle}
        />
        <CardText expandable={true} style={level1CardTextStyle}>
          card text exportieren
        </CardText>
      </Card>
    </Container>
  )
}

export default enhance(Export)
