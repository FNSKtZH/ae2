// @flow
import React, { Fragment } from 'react'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import Collapse from '@material-ui/core/Collapse'
import IconButton from '@material-ui/core/IconButton'
import Icon from '@material-ui/core/Icon'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import styled from 'styled-components'
import { withApollo } from 'react-apollo'
import get from 'lodash/get'
import groupBy from 'lodash/groupBy'
import compose from 'recompose/compose'
import withState from 'recompose/withState'

import AllRcoChooser from './AllRcoChooser'
import RcoChooser from './RcoChooser'
import constants from '../../../../../modules/constants'
import propsByTaxData from '../../propsByTaxData'
import exportTaxonomiesData from '../../../exportTaxonomiesData'
import data from '../../data'
import ErrorBoundary from '../../../../shared/ErrorBoundary'

const PropertiesContainer = styled.div`
  column-width: ${props =>
    props['data-width'] > 2 * constants.export.properties.columnWidth
      ? `${constants.export.properties.columnWidth}px`
      : 'auto'};
`
const StyledCard = styled(Card)`
  margin: 0;
  background-color: rgb(255, 243, 224) !important;
`
const StyledCardActions = styled(CardActions)`
  justify-content: space-between;
  cursor: pointer;
  background-color: #fff3e0;
  border-bottom: 1px solid #ebebeb;
  padding-top: 4px !important;
  padding-bottom: 4px !important;
  height: auto !important;
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
const StyledCollapse = styled(Collapse)`
  padding: 8px 20px;
`
const Count = styled.span`
  font-size: x-small;
  padding-left: 5px;
`

const enhance = compose(
  withApollo,
  exportTaxonomiesData,
  data,
  propsByTaxData,
  withState('expanded', 'setExpanded', false)
)

const RCO = ({
  expanded,
  setExpanded,
  propsByTaxData,
  data,
  pc,
}: {
  expanded: Boolean,
  setExpanded: () => void,
  propsByTaxData: Object,
  data: Object,
  pc: Object,
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

  return (
    <ErrorBoundary>
      <StyledCard>
        <StyledCardActions
          disableActionSpacing
          onClick={() => setExpanded(!expanded)}
        >
          <CardActionTitle>
            {pc}
            <Count>{`(${rcoPropertiesByPropertyCollection[pc].length} ${
              rcoPropertiesByPropertyCollection[pc].length === 1
                ? 'Feld'
                : 'Felder'
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
        <StyledCollapse in={expanded} timeout="auto" unmountOnExit>
          <Fragment>
            {rcoPropertiesByPropertyCollection[pc].length > 1 && (
              <AllRcoChooser
                properties={rcoPropertiesByPropertyCollection[pc]}
              />
            )}
            <PropertiesContainer data-width={window.innerWidth - 84}>
              {rcoPropertiesByPropertyCollection[pc].map(field => (
                <RcoChooser
                  key={`${field.propertyName}${field.jsontype}`}
                  pcname={field.propertyCollectionName}
                  relationtype={field.relationType}
                  pname={field.propertyName}
                  jsontype={field.jsontype}
                  count={field.count}
                />
              ))}
            </PropertiesContainer>
          </Fragment>
        </StyledCollapse>
      </StyledCard>
    </ErrorBoundary>
  )
}

export default enhance(RCO)
