// @flow
import React from 'react'
import { Card, CardHeader, CardText } from 'material-ui/Card'
import styled from 'styled-components'
import { withApollo } from 'react-apollo'
import get from 'lodash/get'
import groupBy from 'lodash/groupBy'
import compose from 'recompose/compose'

import PcoField from '../../PcoField'
import constants from '../../../../../../modules/constants'
import propsByTaxData from '../../../propsByTaxData'
import exportTaxonomiesData from '../../../../exportTaxonomiesData'
import ErrorBoundary from '../../../../../shared/ErrorBoundary'

const StyledCard = styled(Card)`
  margin: 0;
  padding: 0;
`
const StyledCardHeader = styled(CardHeader)`
  background-color: #fff3e0;
  border-bottom: 1px solid #ebebeb;
`
const StyledCardText = styled(CardText)`
  padding: 0 !important;
`
const Count = styled.span`
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

const PcoCard = ({
  propsByTaxData,
  pc,
}: {
  propsByTaxData: Object,
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
      <StyledCard key={pc}>
        <StyledCardHeader
          title={
            <div>
              {pc}
              <Count>{`(${pcoPropertiesByPropertyCollection[pc].length} ${
                pcoPropertiesByPropertyCollection[pc].length === 1
                  ? 'Feld'
                  : 'Felder'
              })`}</Count>
            </div>
          }
          actAsExpander={true}
          showExpandableButton={true}
          titleStyle={level2CardTitleStyle}
        />
        <StyledCardText expandable={true}>
          <PropertiesContainer data-width={window.innerWidth - 84}>
            {pcoPropertiesByPropertyCollection[pc].map(field => (
              <PcoField
                key={`${field.propertyName}${field.jsontype}`}
                pcname={field.propertyCollectionName}
                pname={field.propertyName}
                jsontype={field.jsontype}
              />
            ))}
          </PropertiesContainer>
        </StyledCardText>
      </StyledCard>
    </ErrorBoundary>
  )
}

export default enhance(PcoCard)
