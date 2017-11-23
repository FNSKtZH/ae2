// @flow
import React from 'react'
import { Card, CardHeader, CardText } from 'material-ui/Card'
import Checkbox from 'material-ui/Checkbox'
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
const FieldsContainer = styled.div`
  margin: 16px;
`

const level1CardStyle = { margin: '10px 0' }
const level2CardStyle = { margin: 0, padding: 0 }
const level1CardTitleStyle = { fontWeight: 'bold' }
const level1CardHeaderStyle = { backgroundColor: '#FFCC80' }
const level2CardHeaderStyle = {
  backgroundColor: '#FFF3E0',
  borderBottom: '1px solid #ebebeb',
}
const level1CardTextStyle = { padding: 0 }
const level2CardTextStyle = { padding: 0 }

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
  console.log(
    'Export: pcoPropertiesByPropertyCollection:',
    pcoPropertiesByPropertyCollection
  )
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
        <CardText expandable={true} style={level2CardTextStyle}>
          {Object.keys(pcoPropertiesByPropertyCollection).map(pc => (
            <Card style={level2CardStyle} key={pc}>
              <CardHeader
                title={`${pc} (${
                  pcoPropertiesByPropertyCollection[pc].length
                } Felder)`}
                actAsExpander={true}
                showExpandableButton={true}
                titleStyle={level1CardTitleStyle}
                style={level2CardHeaderStyle}
              />
              <CardText expandable={true} style={level2CardTextStyle}>
                <FieldsContainer>
                  {pcoPropertiesByPropertyCollection[pc].map(field => (
                    <Checkbox
                      key={`${field.propertyName}${field.jsontype}`}
                      label={field.propertyName}
                      checked={false}
                      onCheck={() => console.log('todo')}
                    />
                  ))}
                </FieldsContainer>
              </CardText>
            </Card>
          ))}
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
