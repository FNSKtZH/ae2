// @flow
import React from 'react'
import Card, { CardActions } from 'material-ui/Card'
import Collapse from 'material-ui/transitions/Collapse'
import IconButton from 'material-ui/IconButton'
import Icon from 'material-ui/Icon'
import ExpandMoreIcon from 'material-ui-icons/ExpandMore'
import styled from 'styled-components'
import { withApollo } from 'react-apollo'
import get from 'lodash/get'
import groupBy from 'lodash/groupBy'
import compose from 'recompose/compose'

import RCO from './RCO'
import propsByTaxData from '../propsByTaxData'
import data from '../data'
import ErrorBoundary from '../../../shared/ErrorBoundary'

const StyledCard = styled(Card)`
  margin: 10px 0;
  background-color: rgb(255, 243, 224) !important;
`
const StyledCardActions = styled(CardActions)`
  justify-content: space-between;
  cursor: pointer;
  height: auto !important;
  background-color: #ffcc80;
  display: flex;
`
const CardActionIconButton = styled(IconButton)`
  transform: ${props => (props['data-expanded'] ? 'rotate(180deg)' : 'none')};
`
const CardActionTitle = styled.div`
  padding-left: 8px;
  font-weight: bold;
  word-break: break-word;
`
const Count = styled.span`
  font-size: x-small;
  padding-left: 5px;
`

const enhance = compose(withApollo, data, propsByTaxData)

const RCOs = ({
  propsByTaxData,
  data,
  rcoExpanded,
  onToggleRco,
}: {
  propsByTaxData: Object,
  data: Object,
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
  const rCCount = Object.keys(rcoPropertiesByPropertyCollection).length
  const rcoPropertiesFieldsCount = Object.keys(rcoPropertiesFields).length

  return (
    <ErrorBoundary>
      <StyledCard>
        <StyledCardActions disableActionSpacing onClick={onToggleRco}>
          <CardActionTitle>
            Beziehungssammlungen{
              <Count>
                {rcoPropertiesFieldsCount
                  ? `(${rCCount} Sammlungen, ${rcoPropertiesFieldsCount} Felder)`
                  : '(...)'}
              </Count>
            }
          </CardActionTitle>
          <CardActionIconButton
            data-expanded={rcoExpanded}
            aria-expanded={rcoExpanded}
            aria-label="Show more"
          >
            <Icon>
              <ExpandMoreIcon />
            </Icon>
          </CardActionIconButton>
        </StyledCardActions>
        <Collapse in={rcoExpanded} timeout="auto" unmountOnExit>
          {Object.keys(rcoPropertiesByPropertyCollection).map(pc => (
            <RCO key={pc} pc={pc} />
          ))}
        </Collapse>
      </StyledCard>
    </ErrorBoundary>
  )
}

export default enhance(RCOs)
