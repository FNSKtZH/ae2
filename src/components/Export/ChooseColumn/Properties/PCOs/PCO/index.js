// @flow
import React from 'react'
import { Card, CardHeader, CardText } from 'material-ui/Card'
import styled from 'styled-components'
import get from 'lodash/get'
import groupBy from 'lodash/groupBy'
import compose from 'recompose/compose'

import AllPcoChooser from '../AllPcoChooser'
import PcoChooser from '../PcoChooser'
import constants from '../../../../../../modules/constants'
import propsByTaxData from '../../../propsByTaxData'
import exportTaxonomiesData from '../../../../exportTaxonomiesData'
import ErrorBoundary from '../../../../../shared/ErrorBoundary'

const Level3Card = styled(Card)`
  margin: 0;
  padding: 0;
`
const Level3CardHeader = styled(CardHeader)`
  background-color: #fff3e0;
  border-bottom: 1px solid #ebebeb;
`
const Level3CardText = styled(CardText)`
  display: flex;
  flex-direction: column;
`
const PropertiesContainer = styled.div`
  column-width: ${props =>
    props['data-width'] > 2 * constants.export.properties.columnWidth
      ? `${constants.export.properties.columnWidth}px`
      : 'auto'};
`
const Level3Count = styled.span`
  font-size: x-small;
  padding-left: 5px;
`

const level2CardTitleStyle = { fontWeight: 'bold' }

const enhance = compose(exportTaxonomiesData, propsByTaxData)

const PCO = ({
  propsByTaxData,
  pcoExpanded,
  onTogglePco,
  pc,
}: {
  propsByTaxData: Object,
  pcoExpanded: Boolean,
  onTogglePco: () => {},
  pc: Object,
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

  return (
    <ErrorBoundary>
      <Level3Card key={pc}>
        <Level3CardHeader
          title={
            <div>
              {pc}
              <Level3Count>{`(${pcoPropertiesByPropertyCollection[pc].length} ${
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
          {pcoPropertiesByPropertyCollection[pc].length > 1 && (
            <AllPcoChooser properties={pcoPropertiesByPropertyCollection[pc]} />
          )}
          <PropertiesContainer data-width={window.innerWidth - 84}>
            {pcoPropertiesByPropertyCollection[pc].map(field => (
              <PcoChooser
                key={`${field.propertyName}${field.jsontype}`}
                pcname={field.propertyCollectionName}
                pname={field.propertyName}
                jsontype={field.jsontype}
                count={field.count}
              />
            ))}
          </PropertiesContainer>
        </Level3CardText>
      </Level3Card>
    </ErrorBoundary>
  )
}

export default enhance(PCO)
