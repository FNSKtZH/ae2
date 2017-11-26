// @flow
import React from 'react'
import { Card, CardHeader, CardText } from 'material-ui/Card'
import styled from 'styled-components'
import { withApollo } from 'react-apollo'
import get from 'lodash/get'
import groupBy from 'lodash/groupBy'
import compose from 'recompose/compose'
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
  withApollo
  //withWindowSize,
)

const Container = styled.div`
  padding: 5px 10px;
  height: calc(100% - 48px);
  overflow: auto !important;
`
const Level2Card = styled(Card)`
  margin: 10px 0;
  padding: 0;
  > div {
    padding-bottom: 0 !important;
  }
`
const Level3Card = styled(Card)`
  margin: 0;
  padding: 0;
`
const Level2CardHeader = styled(CardHeader)`
  background-color: #ffcc80;
`
const Level3CardHeader = styled(CardHeader)`
  background-color: #fff3e0;
  border-bottom: 1px solid #ebebeb;
`
const Level2CardText = styled(CardText)`
  padding: 0 !important;
`
const Level3CardText = styled(CardText)`
  padding: 0;
  display: flex;
  flex-direction: column;
`
const PropertiesContainer = styled.div`
  column-width: ${props =>
    props['data-width'] > 2 * constants.export.properties.columnWidth
      ? `${constants.export.properties.columnWidth}px`
      : 'auto'};
`

const level2CardTitleStyle = { fontWeight: 'bold' }

const Properties = ({
  data,
  exportCategoriesData,
  exportCombineTaxonomiesData,
}: //width,
{
  data: Object,
  exportCategoriesData: Object,
  exportCombineTaxonomiesData: Object,
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
  } ${
    Object.keys(taxPropertiesByTaxonomy).length === 1
      ? 'Taxonomie'
      : 'Taxonomien'
  }, ${Object.keys(taxPropertiesFields).length} ${
    Object.keys(taxPropertiesFields).length === 1 ? 'Feld' : 'Felder'
  })`
  //console.log('Properties: taxPropertiesByTaxonomy:', taxPropertiesByTaxonomy)

  return (
    <Container>
      <HowTo />
      <Level2Card>
        <Level2CardHeader
          title={taxTitle}
          actAsExpander={true}
          showExpandableButton={true}
          titleStyle={level2CardTitleStyle}
        />
        <Level2CardText expandable={true}>
          {Object.keys(taxPropertiesByTaxonomy).map(pc => (
            <Level3Card key={pc}>
              <Level3CardHeader
                title={`${pc} (${taxPropertiesByTaxonomy[pc].length} ${
                  taxPropertiesByTaxonomy[pc].length === 1 ? 'Feld' : 'Felder'
                })`}
                actAsExpander={true}
                showExpandableButton={true}
                titleStyle={level2CardTitleStyle}
              />
              <Level3CardText expandable={true}>
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
                      count={field.count}
                    />
                  ))}
                </PropertiesContainer>
              </Level3CardText>
            </Level3Card>
          ))}
        </Level2CardText>
      </Level2Card>
      <Level2Card>
        <Level2CardHeader
          title={pcTitle}
          actAsExpander={true}
          showExpandableButton={true}
          titleStyle={level2CardTitleStyle}
        />
        <Level2CardText expandable={true}>
          {Object.keys(pcoPropertiesByPropertyCollection).map(pc => (
            <Level3Card key={pc}>
              <Level3CardHeader
                title={`${pc} (${
                  pcoPropertiesByPropertyCollection[pc].length
                } ${
                  pcoPropertiesByPropertyCollection[pc].length === 1
                    ? 'Feld'
                    : 'Felder'
                })`}
                actAsExpander={true}
                showExpandableButton={true}
                titleStyle={level2CardTitleStyle}
              />
              <Level3CardText expandable={true}>
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
                      count={field.count}
                    />
                  ))}
                </PropertiesContainer>
              </Level3CardText>
            </Level3Card>
          ))}
        </Level2CardText>
      </Level2Card>
      <Level2Card>
        <Level2CardHeader
          title={rcTitle}
          actAsExpander={true}
          showExpandableButton={true}
          titleStyle={level2CardTitleStyle}
        />
        <Level2CardText expandable={true}>
          {Object.keys(rcoPropertiesByPropertyCollection).map(pc => (
            <Level3Card key={pc}>
              <Level3CardHeader
                title={`${pc} (${
                  rcoPropertiesByPropertyCollection[pc].length
                } ${
                  rcoPropertiesByPropertyCollection[pc].length === 1
                    ? 'Feld'
                    : 'Felder'
                })`}
                actAsExpander={true}
                showExpandableButton={true}
                titleStyle={level2CardTitleStyle}
              />
              <Level3CardText expandable={true}>
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
                      count={field.count}
                    />
                  ))}
                </PropertiesContainer>
              </Level3CardText>
            </Level3Card>
          ))}
        </Level2CardText>
      </Level2Card>
    </Container>
  )
}

export default enhance(Properties)
