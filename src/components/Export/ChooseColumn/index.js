// @flow
import React from 'react'
import { Card, CardHeader, CardText } from 'material-ui/Card'
import Snackbar from 'material-ui/Snackbar'
import styled from 'styled-components'
import compose from 'recompose/compose'
import withState from 'recompose/withState'
import withHandlers from 'recompose/withHandlers'
import get from 'lodash/get'

import Categories from './Categories'
import Properties from './Properties'
import Filter from './Filter'
import exportCategoriesData from '../../../modules/exportCategoriesData'
import exportTaxonomiesData from '../exportTaxonomiesData'
import exportPcoPropertiesData from '../../../modules/exportPcoPropertiesData'
import exportRcoPropertiesData from '../../../modules/exportRcoPropertiesData'
import exportTaxPropertiesData from '../../../modules/exportTaxPropertiesData'
import exportTaxFiltersData from '../../../modules/exportTaxFiltersData'
import exportPcoFiltersData from '../../../modules/exportPcoFiltersData'
import exportRcoFiltersData from '../../../modules/exportRcoFiltersData'

const Level1Card = styled(Card)`
  margin: 10px 0;
`
const Level1CardHeader = styled(CardHeader)`
  background-color: #ffcc80;
`
const Level1CardText = styled(CardText)`
  padding: 0 !important;
`
const level1CardTitleStyle = {
  fontWeight: 'bold',
}

const Container = styled.div`
  padding: 5px 10px;
`
// need to call all local data in case it has not yet been initiated
// (this is an apollo-link-state error)
const enhance = compose(
  exportCategoriesData,
  exportTaxonomiesData,
  exportTaxPropertiesData,
  exportPcoPropertiesData,
  exportRcoPropertiesData,
  exportTaxFiltersData,
  exportPcoFiltersData,
  exportRcoFiltersData,
  withState('taxonomiesExpanded', 'setTaxonomiesExpanded', true),
  withState('filterExpanded', 'setFilterExpanded', false),
  withState('propertiesExpanded', 'setPropertiesExpanded', false),
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
    onToggleTaxonomies: ({
      taxonomiesExpanded,
      setTaxonomiesExpanded,
      setFilterExpanded,
      setPropertiesExpanded,
    }) => () => {
      setTaxonomiesExpanded(!taxonomiesExpanded)
      // close all others
      setFilterExpanded(false)
      setPropertiesExpanded(false)
    },
    onToggleFilter: ({
      exportTaxonomiesData,
      filterExpanded,
      setTaxonomiesExpanded,
      setFilterExpanded,
      setPropertiesExpanded,
      onSetMessage,
    }) => () => {
      const exportTaxonomies = get(exportTaxonomiesData, 'exportTaxonomies', [])
      if (!filterExpanded && exportTaxonomies.length > 0) {
        setFilterExpanded(true)
        // close all others
        setTaxonomiesExpanded(false)
        setPropertiesExpanded(false)
      } else {
        setFilterExpanded(false)
        onSetMessage('Bitte wählen Sie mindestens eine Taxonomie')
      }
    },
    onToggleProperties: ({
      exportTaxonomiesData,
      propertiesExpanded,
      setTaxonomiesExpanded,
      setFilterExpanded,
      setPropertiesExpanded,
      onSetMessage,
    }) => () => {
      const exportTaxonomies = get(exportTaxonomiesData, 'exportTaxonomies', [])
      if (!propertiesExpanded && exportTaxonomies.length > 0) {
        setPropertiesExpanded(true)
        // close all others
        setTaxonomiesExpanded(false)
        setFilterExpanded(false)
      } else {
        setPropertiesExpanded(false)
        onSetMessage('Bitte wählen Sie mindestens eine Gruppe')
      }
    },
  })
)

const Export = ({
  taxonomiesExpanded,
  filterExpanded,
  propertiesExpanded,
  onToggleTaxonomies,
  onToggleFilter,
  onToggleProperties,
  message,
}: {
  taxonomiesExpanded: Boolean,
  filterExpanded: Boolean,
  propertiesExpanded: Boolean,
  onToggleTaxonomies: () => {},
  onToggleFilter: () => {},
  onToggleProperties: () => {},
  message: String,
}) => (
  <Container>
    <Level1Card
      expanded={taxonomiesExpanded}
      onExpandChange={onToggleTaxonomies}
    >
      <Level1CardHeader
        title="1. Gruppen und Taxonomien wählen"
        actAsExpander={true}
        showExpandableButton={true}
        titleStyle={level1CardTitleStyle}
      />
      <Level1CardText expandable={true}>
        <Categories />
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
        <Filter />
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
        <Properties />
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

export default enhance(Export)
