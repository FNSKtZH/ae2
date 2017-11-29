// @flow
import React from 'react'
import { Card, CardHeader, CardText } from 'material-ui/Card'
import Snackbar from 'material-ui/Snackbar'
import { graphql } from 'react-apollo'
import styled from 'styled-components'
import compose from 'recompose/compose'
import withState from 'recompose/withState'
import withHandlers from 'recompose/withHandlers'
//import get from 'lodash/get'

import Categories from './Categories'
import Taxonomies from './Taxonomies'
import Properties from './Properties'
import Filter from './Filter'
import Preview from './Preview'
import exportCategoriesGql from '../../modules/exportCategoriesGql'
import exportTaxonomiesGql from '../../modules/exportTaxonomiesGql'
import exportPcoPropertiesGql from '../../modules/exportPcoPropertiesGql'
import exportRcoPropertiesGql from '../../modules/exportRcoPropertiesGql'
import exportTaxPropertiesGql from '../../modules/exportTaxPropertiesGql'
import exportTaxFiltersGql from '../../modules/exportTaxFiltersGql'
import exportPcoFiltersGql from '../../modules/exportPcoFiltersGql'
import exportRcoFiltersGql from '../../modules/exportRcoFiltersGql'

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
// need to call all local data in case it has not yet been initiated
// (this is an apollo-link-state error)
const exportCategoriesData = graphql(exportCategoriesGql, {
  name: 'exportCategoriesData',
})
const exportTaxonomiesData = graphql(exportTaxonomiesGql, {
  name: 'exportTaxonomiesData',
})
const exportTaxPropertiesData = graphql(exportTaxPropertiesGql, {
  name: 'exportTaxPropertiesData',
})
const exportTaxFiltersData = graphql(exportTaxFiltersGql, {
  name: 'exportTaxFiltersData',
})
const exportPcoPropertiesData = graphql(exportPcoPropertiesGql, {
  name: 'exportPcoPropertiesData',
})
const exportPcoFiltersData = graphql(exportPcoFiltersGql, {
  name: 'exportPcoFiltersData',
})
const exportRcoPropertiesData = graphql(exportRcoPropertiesGql, {
  name: 'exportRcoPropertiesData',
})
const exportRcoFiltersData = graphql(exportRcoFiltersGql, {
  name: 'exportRcoFiltersData',
})

const enhance = compose(
  exportCategoriesData,
  exportTaxonomiesData,
  exportTaxPropertiesData,
  exportPcoPropertiesData,
  exportRcoPropertiesData,
  exportTaxFiltersData,
  exportPcoFiltersData,
  exportRcoFiltersData,
  withState('groupsExpanded', 'setGroupsExpanded', true),
  withState('taxonomiesExpanded', 'setTaxonomiesExpanded', true),
  withState('filterExpanded', 'setFilterExpanded', false),
  withState('propertiesExpanded', 'setPropertiesExpanded', false),
  withState('exportExpanded', 'setExportExpanded', false),
  withState('message', 'setMessage', ''),
  withHandlers({
    onSetMessage: ({ message, setMessage }) => (message: String) => {
      setMessage(message)
      if (!!message) {
        setTimeout(() => setMessage(''), 5000)
      }
    },
  }),
  withHandlers({
    onToggleGroups: ({
      exportCategoriesData,
      groupsExpanded,
      setGroupsExpanded,
      setTaxonomiesExpanded,
      setFilterExpanded,
      setPropertiesExpanded,
      setExportExpanded,
    }) => () => {
      setGroupsExpanded(!groupsExpanded)
      // close all others
      setTaxonomiesExpanded(false)
      setFilterExpanded(false)
      setPropertiesExpanded(false)
      setExportExpanded(false)
    },
    onToggleTaxonomies: ({
      exportCategoriesData,
      exportTaxonomiesData,
      taxonomiesExpanded,
      setGroupsExpanded,
      setTaxonomiesExpanded,
      setFilterExpanded,
      setPropertiesExpanded,
      setExportExpanded,
      onSetMessage,
    }) => () => {
      const { exportCategories } = exportCategoriesData
      if (!taxonomiesExpanded && exportCategories.length > 0) {
        setTaxonomiesExpanded(true)
        // close all others
        setFilterExpanded(true)
        setGroupsExpanded(false)
        setPropertiesExpanded(false)
        setExportExpanded(false)
      } else {
        setTaxonomiesExpanded(false)
        onSetMessage('Bitte wählen Sie mindestens eine Gruppe')
      }
    },
    onToggleFilter: ({
      exportTaxonomiesData,
      filterExpanded,
      setGroupsExpanded,
      setTaxonomiesExpanded,
      setFilterExpanded,
      setPropertiesExpanded,
      setExportExpanded,
      onSetMessage,
    }) => () => {
      const { exportTaxonomies } = exportTaxonomiesData
      if (!filterExpanded && exportTaxonomies.length > 0) {
        setFilterExpanded(true)
        // close all others
        setGroupsExpanded(false)
        setTaxonomiesExpanded(false)
        setPropertiesExpanded(false)
        setExportExpanded(false)
      } else {
        setFilterExpanded(false)
        onSetMessage('Bitte wählen Sie mindestens eine Taxonomie')
      }
    },
    onToggleProperties: ({
      exportCategoriesData,
      propertiesExpanded,
      setGroupsExpanded,
      setTaxonomiesExpanded,
      setFilterExpanded,
      setPropertiesExpanded,
      setExportExpanded,
      onSetMessage,
    }) => () => {
      const { exportCategories } = exportCategoriesData
      if (!propertiesExpanded && exportCategories.length > 0) {
        setPropertiesExpanded(true)
        // close all others
        setGroupsExpanded(false)
        setTaxonomiesExpanded(false)
        setFilterExpanded(false)
        setExportExpanded(false)
      } else {
        setPropertiesExpanded(false)
        onSetMessage('Bitte wählen Sie mindestens eine Gruppe')
      }
    },
    onToggleExport: ({
      exportCategoriesData,
      exportTaxPropertiesData,
      exportPcoPropertiesData,
      exportRcoPropertiesData,
      exportExpanded,
      setGroupsExpanded,
      setTaxonomiesExpanded,
      setFilterExpanded,
      setPropertiesExpanded,
      setExportExpanded,
      onSetMessage,
    }) => () => {
      const { exportCategories } = exportCategoriesData
      const { exportTaxProperties } = exportTaxPropertiesData
      const { exportPcoProperties } = exportPcoPropertiesData
      const { exportRcoProperties } = exportRcoPropertiesData
      const propertiesChoosen =
        exportTaxProperties.length +
          exportPcoProperties.length +
          exportRcoProperties.length >
        0
      if (!exportExpanded && exportCategories.length > 0 && propertiesChoosen) {
        setExportExpanded(true)
        // close all others
        setGroupsExpanded(false)
        setTaxonomiesExpanded(false)
        setFilterExpanded(false)
        setPropertiesExpanded(false)
      } else {
        setExportExpanded(false)
        if (exportCategories.length === 0) {
          onSetMessage('Bitte wählen Sie mindestens eine Gruppe')
        } else if (!propertiesChoosen) {
          onSetMessage('Bitte wählen Sie mindestens eine Eigenschaft')
        }
      }
    },
  })
)

const Export = ({
  data,
  exportCategoriesData,
  exportTaxonomiesData,
  groupsExpanded,
  taxonomiesExpanded,
  filterExpanded,
  propertiesExpanded,
  exportExpanded,
  onToggleGroups,
  onToggleTaxonomies,
  onToggleFilter,
  onToggleProperties,
  onToggleExport,
  message,
}: {
  data: Object,
  exportCategoriesData: Object,
  exportTaxonomiesData: Object,
  groupsExpanded: Boolean,
  taxonomiesExpanded: Boolean,
  filterExpanded: Boolean,
  propertiesExpanded: Boolean,
  exportExpanded: Boolean,
  onToggleGroups: () => {},
  onToggleTaxonomies: () => {},
  onToggleFilter: () => {},
  onToggleProperties: () => {},
  onToggleExport: () => {},
  message: String,
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
          title="1. Gruppen wählen"
          actAsExpander={true}
          showExpandableButton={true}
          titleStyle={level1CardTitleStyle}
        />
        <Level1CardText expandable={true}>
          <Categories data={data} />
        </Level1CardText>
      </Level1Card>
      <Level1Card
        expanded={taxonomiesExpanded}
        onExpandChange={onToggleTaxonomies}
      >
        <Level1CardHeader
          title="2. Taxonomien wählen"
          actAsExpander={true}
          showExpandableButton={true}
          titleStyle={level1CardTitleStyle}
        />
        <Level1CardText expandable={true}>
          <Taxonomies data={data} />
        </Level1CardText>
      </Level1Card>
      <Level1Card expanded={filterExpanded} onExpandChange={onToggleFilter}>
        <Level1CardHeader
          title="3. filtern"
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
          title="4. Eigenschaften wählen"
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
          title="5. exportieren"
          actAsExpander={true}
          showExpandableButton={true}
          titleStyle={level1CardTitleStyle}
        />
        <Level1CardText expandable={true}>
          <Preview />
        </Level1CardText>
      </Level1Card>
      <Snackbar
        open={!!message}
        message={message}
        bodyStyle={{
          maxWidth: 'auto',
          minWidth: 'auto',
          backgroundColor: '#2E7D32',
        }}
      />
    </Container>
  )
}

export default enhance(Export)
