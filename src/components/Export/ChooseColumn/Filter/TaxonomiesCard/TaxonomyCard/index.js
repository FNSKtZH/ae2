// @flow
import React from 'react'
import { CardHeader, CardText } from 'material-ui/Card'
import Card, { CardActions, CardContent } from 'material-ui-next/Card'
import Collapse from 'material-ui-next/transitions/Collapse'
import IconButton from 'material-ui-next/IconButton'
import Icon from 'material-ui-next/Icon'
import ExpandMoreIcon from 'material-ui-icons/ExpandMore'
import styled from 'styled-components'
import { withApollo } from 'react-apollo'
import get from 'lodash/get'
import groupBy from 'lodash/groupBy'
import compose from 'recompose/compose'
import withState from 'recompose/withState'

import TaxField from '../../TaxField'
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

const enhance = compose(
  withApollo,
  exportTaxonomiesData,
  propsByTaxData,
  withState('expanded', 'setExpanded', false)
)

const TaxonomyCard = ({
  pc,
  propsByTaxData,
}: {
  pc: Object,
  propsByTaxData: Object,
}) => {
  const taxProperties = get(
    propsByTaxData,
    'taxPropertiesByTaxonomiesFunction.nodes',
    []
  )

  const taxPropertiesByTaxonomy = groupBy(taxProperties, 'taxonomyName')

  return (
    <ErrorBoundary>
      <StyledCard>
        <StyledCardHeader
          title={
            <div>
              {pc}
              <Count>{`(${taxPropertiesByTaxonomy[pc].length} ${
                taxPropertiesByTaxonomy[pc].length === 1 ? 'Feld' : 'Felder'
              })`}</Count>
            </div>
          }
          actAsExpander={true}
          showExpandableButton={true}
          titleStyle={level2CardTitleStyle}
        />
        <StyledCardText expandable={true}>
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
        </StyledCardText>
      </StyledCard>
    </ErrorBoundary>
  )
}

export default enhance(TaxonomyCard)
