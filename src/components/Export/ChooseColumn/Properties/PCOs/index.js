// @flow
import React from 'react'
import { Card, CardHeader, CardText } from 'material-ui/Card'
import styled from 'styled-components'
import get from 'lodash/get'
import groupBy from 'lodash/groupBy'
import compose from 'recompose/compose'

import PCO from './PCO'
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

const enhance = compose(exportTaxonomiesData, propsByTaxData)

const PCOs = ({
  propsByTaxData,
  pcoExpanded,
  onTogglePco,
}: {
  propsByTaxData: Object,
  pcoExpanded: Boolean,
  onTogglePco: () => {},
}) => {
  const pcoProperties = get(
    propsByTaxData,
    'pcoPropertiesByTaxonomiesFunction.nodes',
    []
  )
  const pcoPropertiesByPropertyCollection = groupBy(
    pcoProperties,
    'propertyCollectionName'
  )
  const pcoPropertiesFields = groupBy(pcoProperties, 'propertyName')
  const pCCount = Object.keys(pcoPropertiesByPropertyCollection).length

  return (
    <ErrorBoundary>
      <Level2Card expanded={pcoExpanded} onExpandChange={onTogglePco}>
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
            <PCO key={pc} pc={pc} />
          ))}
        </Level2CardText>
      </Level2Card>
    </ErrorBoundary>
  )
}

export default enhance(PCOs)
