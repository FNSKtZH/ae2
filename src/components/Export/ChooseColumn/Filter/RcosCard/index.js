// @flow
import React from 'react'
import { Card, CardHeader, CardText } from 'material-ui/Card'
import styled from 'styled-components'
import { withApollo } from 'react-apollo'
import get from 'lodash/get'
import groupBy from 'lodash/groupBy'
import compose from 'recompose/compose'

import RcoField from '../RcoField'
import constants from '../../../../../modules/constants'
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

const RcosCard = ({
  propsByTaxData,
  rcoExpanded,
  onToggleRco,
}: {
  propsByTaxData: Object,
  rcoExpanded: Boolean,
  onToggleRco: () => {},
}) => {
  const rcoProperties = get(
    propsByTaxData,
    'rcoPropertiesByTaxonomiesFunction.nodes',
    []
  )

  const rcoPropertiesByPropertyCollection = groupBy(rcoProperties, x => {
    if (x.propertyCollectionName.includes(x.relationType)) {
      return x.propertyCollectionName
    }
    return `${x.propertyCollectionName}: ${x.relationType}`
  })
  const rcoPropertiesFields = groupBy(rcoProperties, 'propertyName')
  //console.log('RcosCard: pcoPropertiesFields:', pcoPropertiesFields)
  const rCCount = Object.keys(rcoPropertiesByPropertyCollection).length

  return (
    <ErrorBoundary>
      <Level2Card expanded={rcoExpanded} onExpandChange={onToggleRco}>
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
                      pcname={field.propertyCollectionName}
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
    </ErrorBoundary>
  )
}

export default enhance(RcosCard)
