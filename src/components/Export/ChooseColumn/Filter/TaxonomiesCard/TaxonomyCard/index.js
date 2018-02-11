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
  background-color: rgb(255, 243, 224) !important;
`
const StyledCardActions = styled(CardActions)`
  justify-content: space-between;
  cursor: pointer;
  background-color: #fff3e0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
`
const CardActionIconButton = styled(IconButton)`
  transform: ${props => (props['data-expanded'] ? 'rotate(180deg)' : 'none')};
`
const CardActionTitle = styled.div`
  padding-left: 8px;
  font-weight: bold;
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

const enhance = compose(
  withApollo,
  exportTaxonomiesData,
  propsByTaxData,
  withState('expanded', 'setExpanded', false)
)

const TaxonomyCard = ({
  pc,
  propsByTaxData,
  expanded,
  setExpanded,
}: {
  pc: Object,
  propsByTaxData: Object,
  expanded: Boolean,
  setExpanded: () => void,
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
        <StyledCardActions
          disableActionSpacing
          onClick={() => setExpanded(!expanded)}
        >
          <CardActionTitle>
            {pc}
            <Count>{`(${taxPropertiesByTaxonomy[pc].length} ${
              taxPropertiesByTaxonomy[pc].length === 1 ? 'Feld' : 'Felder'
            })`}</Count>
          </CardActionTitle>
          <CardActionIconButton
            data-expanded={expanded}
            aria-expanded={expanded}
            aria-label="Show more"
          >
            <Icon>
              <ExpandMoreIcon />
            </Icon>
          </CardActionIconButton>
        </StyledCardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
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
        </Collapse>
      </StyledCard>
    </ErrorBoundary>
  )
}

export default enhance(TaxonomyCard)
