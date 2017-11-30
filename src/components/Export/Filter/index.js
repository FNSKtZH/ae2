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
import Tipps from './Tipps'
import TaxField from './TaxField'
import PcoField from './PcoField'
import RcoField from './RcoField'
//import RcoChooser from './RcoChooser'
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
  padding: 0 !important;
`
const Level2Count = styled.span`
  font-size: x-small;
  padding-left: 5px;
`
const Level3Count = styled.span`
  font-size: x-small;
  padding-left: 5px;
`
const PropertiesContainer = styled.div`
  margin: 8px 0;
  column-width: ${props =>
    props['data-width'] > 2 * constants.export.properties.columnWidth
      ? `${constants.export.properties.columnWidth}px`
      : 'auto'};
`

const level2CardTitleStyle = { fontWeight: 'bold' }

const Filter = ({
  data,
  exportTaxonomiesData,
  exportCombineTaxonomiesData,
}: //width,
{
  data: Object,
  exportTaxonomiesData: Object,
  exportCombineTaxonomiesData: Object,
  //width: number,
}) => {
  const pcoProperties = get(data, 'pcoPropertiesByTaxonomiesFunction.nodes', [])
  const rcoProperties = get(data, 'rcoPropertiesByTaxonomiesFunction.nodes', [])
  const taxProperties = get(data, 'taxPropertiesByTaxonomiesFunction.nodes', [])
  const pcoPropertiesByPropertyCollection = groupBy(
    pcoProperties,
    'propertyCollectionName'
  )
  const pcoPropertiesFields = groupBy(pcoProperties, 'propertyName')
  console.log(
    'Filter: pcoPropertiesByPropertyCollection:',
    pcoPropertiesByPropertyCollection
  )
  const pCCount = Object.keys(pcoPropertiesByPropertyCollection).length

  const rcoPropertiesByPropertyCollection = groupBy(rcoProperties, x => {
    if (x.propertyCollectionName.includes(x.relationType)) {
      return x.propertyCollectionName
    }
    return `${x.propertyCollectionName}: ${x.relationType}`
  })
  const rcoPropertiesFields = groupBy(rcoProperties, 'propertyName')
  //console.log('Filter: pcoPropertiesFields:', pcoPropertiesFields)
  const rCCount = Object.keys(rcoPropertiesByPropertyCollection).length
  console.log(
    'Filter: rcoPropertiesByPropertyCollection:',
    rcoPropertiesByPropertyCollection
  )

  const taxPropertiesByTaxonomy = groupBy(taxProperties, 'taxonomyName')
  const taxPropertiesFields = groupBy(taxProperties, 'propertyName')
  //console.log('Filter: taxPropertiesByTaxonomy:', taxPropertiesByTaxonomy)
  const taxCount = Object.keys(taxPropertiesByTaxonomy).length
  const taxFieldsCount = Object.keys(taxPropertiesFields).length

  return (
    <Container>
      <HowTo />
      <Tipps />
      <Level2Card>
        <Level2CardHeader
          title={
            <div>
              Taxonomien{taxCount > 0 && (
                <Level2Count>{`(${taxCount} ${
                  taxCount === 1 ? 'Taxonomie' : 'Taxonomien'
                }, ${taxFieldsCount} ${
                  taxFieldsCount === 1 ? 'Feld' : 'Felder'
                })`}</Level2Count>
              )}
            </div>
          }
          actAsExpander={true}
          showExpandableButton={true}
          titleStyle={level2CardTitleStyle}
        />
        <Level2CardText expandable={true}>
          {Object.keys(taxPropertiesByTaxonomy).map(pc => (
            <Level3Card key={pc}>
              <Level3CardHeader
                title={
                  <div>
                    {pc}
                    <Level3Count>{`(${taxPropertiesByTaxonomy[pc].length} ${
                      taxPropertiesByTaxonomy[pc].length === 1
                        ? 'Feld'
                        : 'Felder'
                    })`}</Level3Count>
                  </div>
                }
                actAsExpander={true}
                showExpandableButton={true}
                titleStyle={level2CardTitleStyle}
              />
              <Level3CardText expandable={true}>
                <PropertiesContainer data-width={window.innerWidth - 84}>
                  {taxPropertiesByTaxonomy[pc].map(field => (
                    <TaxField
                      key={`${field.propertyName}${field.jsontype}`}
                      taxName={field.taxonomyName}
                      pName={field.propertyName}
                      jsontype={field.jsontype}
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
          title={
            <div>
              Eigenschaftensammlungen{pCCount > 0 && (
                <Level2Count>{`(${pCCount} Sammlungen, ${
                  Object.keys(pcoPropertiesFields).length
                } ${
                  Object.keys(pcoPropertiesFields).length === 1
                    ? 'Feld'
                    : 'Felder'
                })`}</Level2Count>
              )}
            </div>
          }
          actAsExpander={true}
          showExpandableButton={true}
          titleStyle={level2CardTitleStyle}
        />
        <Level2CardText expandable={true}>
          {Object.keys(pcoPropertiesByPropertyCollection).map(pc => (
            <Level3Card key={pc}>
              <Level3CardHeader
                title={
                  <div>
                    {pc}
                    <Level3Count>{`(${
                      pcoPropertiesByPropertyCollection[pc].length
                    } ${
                      pcoPropertiesByPropertyCollection[pc].length === 1
                        ? 'Feld'
                        : 'Felder'
                    })`}</Level3Count>
                  </div>
                }
                actAsExpander={true}
                showExpandableButton={true}
                titleStyle={level2CardTitleStyle}
              />
              <Level3CardText expandable={true}>
                <PropertiesContainer data-width={window.innerWidth - 84}>
                  {pcoPropertiesByPropertyCollection[pc].map(field => (
                    <PcoField
                      key={`${field.propertyName}${field.jsontype}`}
                      pCName={field.propertyCollectionName}
                      pName={field.propertyName}
                      jsontype={field.jsontype}
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
          title={
            <div>
              Beziehungssammlungen{rCCount > 0 && (
                <Level2Count>{`(${rCCount} Sammlungen, ${
                  Object.keys(rcoPropertiesFields).length
                } ${
                  Object.keys(rcoPropertiesFields).length === 1
                    ? 'Feld'
                    : 'Felder'
                })`}</Level2Count>
              )}
            </div>
          }
          actAsExpander={true}
          showExpandableButton={true}
          titleStyle={level2CardTitleStyle}
        />
        <Level2CardText expandable={true}>
          {Object.keys(rcoPropertiesByPropertyCollection).map(pc => (
            <Level3Card key={pc}>
              <Level3CardHeader
                title={
                  <div>
                    {pc}
                    <Level3Count>{`(${
                      rcoPropertiesByPropertyCollection[pc].length
                    } ${
                      rcoPropertiesByPropertyCollection[pc].length === 1
                        ? 'Feld'
                        : 'Felder'
                    })`}</Level3Count>
                  </div>
                }
                actAsExpander={true}
                showExpandableButton={true}
                titleStyle={level2CardTitleStyle}
              />
              <Level3CardText expandable={true}>
                <PropertiesContainer data-width={window.innerWidth - 84}>
                  {rcoPropertiesByPropertyCollection[pc].map(field => (
                    <RcoField
                      key={`${field.propertyName}${field.jsontype}`}
                      pCName={field.propertyCollectionName}
                      pName={field.propertyName}
                      jsontype={field.jsontype}
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

export default enhance(Filter)
