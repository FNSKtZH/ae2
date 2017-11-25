// @flow
import React from 'react'
import { Card, CardHeader, CardText } from 'material-ui/Card'
import styled from 'styled-components'
import { withApollo } from 'react-apollo'
import get from 'lodash/get'
import groupBy from 'lodash/groupBy'
import compose from 'recompose/compose'
import withHandlers from 'recompose/withHandlers'
//import { withWindowSize } from 'react-fns'

import HowTo from './HowTo'
import AllTaxChooser from './AllTaxChooser'
import AllPcoChooser from './AllPcoChooser'
import AllRcoChooser from './AllRcoChooser'
import TaxChooser from './TaxChooser'
import PcoChooser from './PcoChooser'
import RcoChooser from './RcoChooser'
import constants from '../../../modules/constants'

const enhance = compose(
  withApollo,
  //withWindowSize,
  withHandlers({
    onCheck: () => (event, isChecked) => {
      console.log('event:', event)
      console.log('event.target:', event.target)
      console.log('isChecked:', isChecked)
    },
  })
)

const Container = styled.div`
  padding: 5px 10px;
  height: calc(100% - 48px);
  overflow: auto !important;
`
const Level1Card = styled(Card)`
  margin: 10px 0;
  padding: 0;
  > div {
    padding-bottom: 0 !important;
  }
`
const Level2Card = styled(Card)`
  margin: 0;
  padding: 0;
`
const Level1CardHeader = styled(CardHeader)`
  background-color: #ffcc80;
`
const Level2CardHeader = styled(CardHeader)`
  background-color: #fff3e0;
  border-bottom: 1px solid #ebebeb;
`
const Level1CardText = styled(CardText)`
  padding: 0;
`
const Level2CardText = styled(CardText)`
  padding: 0;
  display: flex;
  flex-direction: column;
`
const PropertiesContainer = styled.div`
  margin: 16px;
  column-width: ${props =>
    props['data-width'] > 2 * constants.export.properties.columnWidth
      ? `${constants.export.properties.columnWidth}px`
      : 'auto'};
`

const level1CardTitleStyle = { fontWeight: 'bold' }

const Properties = ({
  data,
  exportCategoriesData,
  exportCombineTaxonomiesData,
  onCheck,
}: //width,
{
  data: Object,
  exportCategoriesData: Object,
  exportCombineTaxonomiesData: Object,
  onCheck: () => void,
  //width: number,
}) => {
  const pcoProperties = get(data, 'pcoPropertiesByCategoriesFunction.nodes', [])
  const rcoProperties = get(data, 'rcoPropertiesByCategoriesFunction.nodes', [])
  const taxProperties = get(data, 'taxPropertiesByCategoriesFunction.nodes', [])
  const pcoPropertiesByPropertyCollection = groupBy(
    pcoProperties,
    'propertyCollectionName'
  )
  const pcoPropertiesFields = groupBy(pcoProperties, 'propertyName')
  /*console.log(
    'Properties: pcoPropertiesByPropertyCollection:',
    pcoPropertiesByPropertyCollection
  )*/
  const pcTitle = `Eigenschaftensammlungen (${
    Object.keys(pcoPropertiesByPropertyCollection).length
  } Sammlungen, ${Object.keys(pcoPropertiesFields).length} ${
    Object.keys(pcoPropertiesFields).lengt === 1 ? 'Feld' : 'Felder'
  })`

  const rcoPropertiesByPropertyCollection = groupBy(rcoProperties, x => {
    if (x.propertyCollectionName.includes(x.relationType)) {
      return x.propertyCollectionName
    }
    return `${x.propertyCollectionName}: ${x.relationType}`
  })
  const rcoPropertiesFields = groupBy(rcoProperties, 'propertyName')
  //console.log('Properties: pcoPropertiesFields:', pcoPropertiesFields)
  const rcTitle = `Beziehungssammlungen (${
    Object.keys(rcoPropertiesByPropertyCollection).length
  } Sammlungen, ${Object.keys(rcoPropertiesFields).length} ${
    Object.keys(rcoPropertiesFields).length === 1 ? 'Feld' : 'Felder'
  })`
  /*console.log(
    'Properties: rcoPropertiesByPropertyCollection:',
    rcoPropertiesByPropertyCollection
  )*/

  const taxPropertiesByTaxonomy = groupBy(taxProperties, 'taxonomyName')
  const taxPropertiesFields = groupBy(taxProperties, 'propertyName')
  const taxTitle = `Taxonomien (${
    Object.keys(taxPropertiesByTaxonomy).length
  } Taxonomien, ${Object.keys(taxPropertiesFields).length} ${
    Object.keys(taxPropertiesFields).length === 1 ? 'Feld' : 'Felder'
  })`
  //console.log('Properties: taxPropertiesByTaxonomy:', taxPropertiesByTaxonomy)

  return (
    <Container>
      <HowTo />
      <Level1Card>
        <Level1CardHeader
          title={taxTitle}
          actAsExpander={true}
          showExpandableButton={true}
          titleStyle={level1CardTitleStyle}
        />
        <Level1CardText expandable={true}>
          {Object.keys(taxPropertiesByTaxonomy).map(pc => (
            <Level2Card key={pc}>
              <Level2CardHeader
                title={`${pc} (${taxPropertiesByTaxonomy[pc].length} ${
                  taxPropertiesByTaxonomy[pc].length === 1 ? 'Feld' : 'Felder'
                })`}
                actAsExpander={true}
                showExpandableButton={true}
                titleStyle={level1CardTitleStyle}
              />
              <Level2CardText expandable={true}>
                {taxPropertiesByTaxonomy[pc].length > 1 && (
                  <AllTaxChooser properties={taxPropertiesByTaxonomy[pc]} />
                )}
                <PropertiesContainer data-width={window.innerWidth - 84}>
                  {taxPropertiesByTaxonomy[pc].map(field => (
                    <TaxChooser
                      key={`${field.propertyName}${field.jsontype}`}
                      taxName={field.taxonomyName}
                      pName={field.propertyName}
                      jsontype={field.jsontype}
                    />
                  ))}
                </PropertiesContainer>
              </Level2CardText>
            </Level2Card>
          ))}
        </Level1CardText>
      </Level1Card>
      <Level1Card>
        <Level1CardHeader
          title={pcTitle}
          actAsExpander={true}
          showExpandableButton={true}
          titleStyle={level1CardTitleStyle}
        />
        <Level1CardText expandable={true}>
          {Object.keys(pcoPropertiesByPropertyCollection).map(pc => (
            <Level2Card key={pc}>
              <Level2CardHeader
                title={`${pc} (${
                  pcoPropertiesByPropertyCollection[pc].length
                } ${
                  pcoPropertiesByPropertyCollection[pc].length === 1
                    ? 'Feld'
                    : 'Felder'
                })`}
                actAsExpander={true}
                showExpandableButton={true}
                titleStyle={level1CardTitleStyle}
              />
              <Level2CardText expandable={true}>
                {pcoPropertiesByPropertyCollection[pc].length > 1 && (
                  <AllPcoChooser
                    properties={pcoPropertiesByPropertyCollection[pc]}
                  />
                )}
                <PropertiesContainer data-width={window.innerWidth - 84}>
                  {pcoPropertiesByPropertyCollection[pc].map(field => (
                    <PcoChooser
                      key={`${field.propertyName}${field.jsontype}`}
                      pCName={field.propertyCollectionName}
                      pName={field.propertyName}
                      jsontype={field.jsontype}
                    />
                  ))}
                </PropertiesContainer>
              </Level2CardText>
            </Level2Card>
          ))}
        </Level1CardText>
      </Level1Card>
      <Level1Card>
        <Level1CardHeader
          title={rcTitle}
          actAsExpander={true}
          showExpandableButton={true}
          titleStyle={level1CardTitleStyle}
        />
        <Level1CardText expandable={true}>
          {Object.keys(rcoPropertiesByPropertyCollection).map(pc => (
            <Level2Card key={pc}>
              <Level2CardHeader
                title={`${pc} (${
                  rcoPropertiesByPropertyCollection[pc].length
                } ${
                  rcoPropertiesByPropertyCollection[pc].length === 1
                    ? 'Feld'
                    : 'Felder'
                })`}
                actAsExpander={true}
                showExpandableButton={true}
                titleStyle={level1CardTitleStyle}
              />
              <Level2CardText expandable={true}>
                {rcoPropertiesByPropertyCollection[pc].length > 1 && (
                  <AllRcoChooser
                    properties={rcoPropertiesByPropertyCollection[pc]}
                  />
                )}
                <PropertiesContainer data-width={window.innerWidth - 84}>
                  {rcoPropertiesByPropertyCollection[pc].map(field => (
                    <RcoChooser
                      key={`${field.propertyName}${field.jsontype}`}
                      pCName={field.propertyCollectionName}
                      pName={field.propertyName}
                      jsontype={field.jsontype}
                    />
                  ))}
                </PropertiesContainer>
              </Level2CardText>
            </Level2Card>
          ))}
        </Level1CardText>
      </Level1Card>
    </Container>
  )
}

export default enhance(Properties)
