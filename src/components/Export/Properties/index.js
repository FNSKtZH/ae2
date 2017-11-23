// @flow
import React from 'react'
import { Card, CardHeader, CardText } from 'material-ui/Card'
import styled from 'styled-components'
import { withApollo } from 'react-apollo'
import get from 'lodash/get'
import groupBy from 'lodash/groupBy'
import compose from 'recompose/compose'
import withHandlers from 'recompose/withHandlers'

import HowTo from './HowTo'

const enhance = compose(
  withApollo,
  withHandlers({
    onCheck: () => (event, isChecked) => {},
  })
)

const Container = styled.div`
  padding: 5px 10px;
  height: calc(100% - 48px);
  overflow: auto !important;
`

const level1CardStyle = { margin: '10px 0' }
const level1CardTitleStyle = { fontWeight: 'bold' }
const level1CardHeaderStyle = { backgroundColor: '#FFCC80' }
const level1CardTextStyle = { padding: '5px 16px' }

const Properties = ({
  data,
  exportCategoriesData,
  exportCombineTaxonomiesData,
  onCheck,
}: {
  data: Object,
  exportCategoriesData: Object,
  exportCombineTaxonomiesData: Object,
  onCheck: () => void,
}) => {
  const pcoProperties = get(data, 'pcoPropertiesByCategoriesFunction.nodes', [])
  const rcoProperties = get(data, 'rcoPropertiesByCategoriesFunction.nodes', [])
  const taxProperties = get(data, 'taxPropertiesByCategoriesFunction.nodes', [])
  const taxPropertiesGroupedByProperty = groupBy(taxProperties, 'propertyName')
  const taxTitle = `Taxonomie (${
    Object.keys(taxPropertiesGroupedByProperty).length
  } Felder)`
  const pcoPropertiesByPropertyCollection = groupBy(
    pcoProperties,
    'propertyCollectionName'
  )
  const pcoPropertiesFields = groupBy(pcoProperties, 'propertyName')
  //console.log('Export: pcoPropertiesFields:', pcoPropertiesFields)
  const pcTitle = `Eigenschaftensammlungen (${
    Object.keys(pcoPropertiesByPropertyCollection).length
  } Sammlungen, ${Object.keys(pcoPropertiesFields).length} Felder)`

  const rcoPropertiesByPropertyCollection = groupBy(
    rcoProperties,
    'propertyCollectionName'
  )
  const rcoPropertiesFields = groupBy(rcoProperties, 'propertyName')
  //console.log('Export: pcoPropertiesFields:', pcoPropertiesFields)
  const rcTitle = `Beziehungssammlungen (${
    Object.keys(rcoPropertiesByPropertyCollection).length
  } Sammlungen, ${Object.keys(rcoPropertiesFields).length} Felder)`

  return (
    <Container>
      <HowTo />
      <Card style={level1CardStyle}>
        <CardHeader
          title={taxTitle}
          actAsExpander={true}
          showExpandableButton={true}
          titleStyle={level1CardTitleStyle}
          style={level1CardHeaderStyle}
        />
        <CardText expandable={true} style={level1CardTextStyle}>
          need something here
        </CardText>
      </Card>
      <Card style={level1CardStyle}>
        <CardHeader
          title={pcTitle}
          actAsExpander={true}
          showExpandableButton={true}
          titleStyle={level1CardTitleStyle}
          style={level1CardHeaderStyle}
        />
        <CardText expandable={true} style={level1CardTextStyle}>
          need something here
        </CardText>
      </Card>
      <Card style={level1CardStyle}>
        <CardHeader
          title={rcTitle}
          actAsExpander={true}
          showExpandableButton={true}
          titleStyle={level1CardTitleStyle}
          style={level1CardHeaderStyle}
        />
        <CardText expandable={true} style={level1CardTextStyle}>
          need something here
        </CardText>
      </Card>
    </Container>
  )
}

export default enhance(Properties)
