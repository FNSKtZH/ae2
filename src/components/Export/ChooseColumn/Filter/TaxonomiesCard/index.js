// @flow
import React from 'react'
import { Card, CardHeader, CardText } from 'material-ui/Card'
import styled from 'styled-components'
import { withApollo } from 'react-apollo'
import get from 'lodash/get'
import groupBy from 'lodash/groupBy'
import sumBy from 'lodash/sumBy'
import compose from 'recompose/compose'

import TaxField from '../TaxField'
import constants from '../../../../../modules/constants'
import propsByTaxData from '../../propsByTaxData'
import exportTaxonomiesData from '../../../exportTaxonomiesData'

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
  padding-bottom: 10px;
  column-width: ${props =>
    props['data-width'] > 2 * constants.export.properties.columnWidth
      ? `${constants.export.properties.columnWidth}px`
      : 'auto'};
`

const level2CardTitleStyle = { fontWeight: 'bold' }

const enhance = compose(withApollo, exportTaxonomiesData, propsByTaxData)

const Filter = ({
  propsByTaxData,
  taxonomiesExpanded,
  jointTaxonomiesExpanded,
  onToggleTaxonomies,
  onToggleJointTaxonomies,
}: {
  propsByTaxData: Object,
  taxonomiesExpanded: Boolean,
  jointTaxonomiesExpanded: Boolean,
  onToggleTaxonomies: () => {},
  onToggleJointTaxonomies: () => {},
}) => {
  const taxProperties = get(
    propsByTaxData,
    'taxPropertiesByTaxonomiesFunction.nodes',
    []
  )

  const taxPropertiesByTaxonomy = groupBy(taxProperties, 'taxonomyName')
  const taxPropertiesFields = groupBy(taxProperties, 'propertyName')
  const taxCount = Object.keys(taxPropertiesByTaxonomy).length
  const taxFieldsCount = Object.keys(taxPropertiesFields).length
  let jointTaxProperties = []
  if (taxCount > 1) {
    jointTaxProperties = Object.values(
      groupBy(taxProperties, t => `${t.propertyName}/${t.jsontype}`)
    )
      .filter(v => v.length === taxCount)
      .map(t => ({
        count: sumBy(t, x => Number(x.count)),
        jsontype: t[0].jsontype,
        propertyName: t[0].propertyName,
        taxonomies: t.map(x => x.taxonomyName),
        taxname: 'Taxonomie',
      }))
  }

  return (
    <Level2Card
      expanded={taxonomiesExpanded}
      onExpandChange={onToggleTaxonomies}
    >
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
        {jointTaxProperties.length > 0 && (
          <Level3Card key="jointTax">
            <Level3CardHeader
              title={
                <div>
                  {`Gemeinsame Felder`}
                  <Level3Count>{`(${jointTaxProperties.length})`}</Level3Count>
                </div>
              }
              actAsExpander={true}
              showExpandableButton={true}
              titleStyle={level2CardTitleStyle}
            />
            <Level3CardText expandable={true}>
              <PropertiesContainer data-width={window.innerWidth - 84}>
                {jointTaxProperties.map(field => (
                  <TaxField
                    key={`${field.propertyName}${field.jsontype}`}
                    taxname="Taxonomie"
                    pname={field.propertyName}
                    jsontype={field.jsontype}
                  />
                ))}
              </PropertiesContainer>
            </Level3CardText>
          </Level3Card>
        )}
        {Object.keys(taxPropertiesByTaxonomy).map(pc => (
          <Level3Card key={pc}>
            <Level3CardHeader
              title={
                <div>
                  {pc}
                  <Level3Count>{`(${taxPropertiesByTaxonomy[pc].length} ${
                    taxPropertiesByTaxonomy[pc].length === 1 ? 'Feld' : 'Felder'
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
                    taxname={field.taxonomyName}
                    pname={field.propertyName}
                    jsontype={field.jsontype}
                  />
                ))}
              </PropertiesContainer>
            </Level3CardText>
          </Level3Card>
        ))}
      </Level2CardText>
    </Level2Card>
  )
}

export default enhance(Filter)
