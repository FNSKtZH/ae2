// @flow
import React from 'react'
import { Card, CardHeader, CardText } from 'material-ui/Card'
import styled from 'styled-components'
import { withApollo } from 'react-apollo'
import get from 'lodash/get'
import groupBy from 'lodash/groupBy'
import sumBy from 'lodash/sumBy'
import compose from 'recompose/compose'

import TaxonomyCard from './TaxonomyCard'
import JointTaxonomyCard from './JointTaxonomyCard'
import propsByTaxData from '../../propsByTaxData'
import exportTaxonomiesData from '../../../exportTaxonomiesData'
import ErrorBoundary from '../../../../shared/ErrorBoundary'

const Level2Card = styled(Card)`
  margin: 10px 0;
  padding: 0;
  > div {
    padding-bottom: 0 !important;
  }
`
const Level2CardHeader = styled(CardHeader)`
  background-color: #ffcc80;
`
const Level2CardText = styled(CardText)`
  padding: 0 !important;
`
const Level2Count = styled.span`
  font-size: x-small;
  padding-left: 5px;
`

const level2CardTitleStyle = { fontWeight: 'bold' }

const enhance = compose(withApollo, exportTaxonomiesData, propsByTaxData)

const TaxonomiesCard = ({
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
    <ErrorBoundary>
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
            <JointTaxonomyCard jointTaxProperties={jointTaxProperties} />
          )}
          {Object.keys(taxPropertiesByTaxonomy).map(pc => (
            <TaxonomyCard pc={pc} key={pc} />
          ))}
        </Level2CardText>
      </Level2Card>
    </ErrorBoundary>
  )
}

export default enhance(TaxonomiesCard)
