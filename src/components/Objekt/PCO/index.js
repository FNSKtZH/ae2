// @flow
import React from 'react'
import Card, { CardActions } from 'material-ui/Card'
import Collapse from 'material-ui/transitions/Collapse'
import IconButton from 'material-ui/IconButton'
import Icon from 'material-ui/Icon'
import ExpandMoreIcon from 'material-ui-icons/ExpandMore'
import get from 'lodash/get'
import sortBy from 'lodash/sortBy'
import compose from 'recompose/compose'
import withState from 'recompose/withState'
import styled from 'styled-components'

import PC from './PC'
import PropertyReadOnly from '../../shared/PropertyReadOnly'
import Relation from '../Relation'
import ErrorBoundary from '../../shared/ErrorBoundary'

const RelationTitle = styled.div`
  font-weight: bold;
  border-bottom: 1px solid #c6c6c6;
  padding: 5px;
  border-radius: 4px 4px 0 0;
`
const StyledCard = styled(Card)`
  margin: 10px 0;
  background-color: rgb(255, 243, 224) !important;
`
const StyledCardActions = styled(CardActions)`
  justify-content: space-between;
  cursor: pointer;
  height: auto !important;
  background-color: #ffcc80;
`
const CardActionIconButton = styled(IconButton)`
  transform: ${props => (props['data-expanded'] ? 'rotate(180deg)' : 'none')};
`
const CardActionTitle = styled.div`
  padding-left: 8px;
  font-weight: bold;
  word-break: break-word;
`
const CardText = styled.div`
  padding: 5px 16px;
  column-width: 500px;
`

const enhance = compose(withState('expanded', 'setExpanded', false))

const PCO = ({
  expanded,
  setExpanded,
  pCO,
  relations,
}: {
  expanded: Boolean,
  setExpanded: () => void,
  pCO: Object,
  relations: Array<Object>,
}) => {
  const pC = get(pCO, 'propertyCollectionByPropertyCollectionId', {})
  const pcname = get(pC, 'name', '(Name fehlt)')
  // never pass null to object.entries!!!
  const properties = JSON.parse(pCO.properties) || {}

  let propertiesArray = Object.entries(properties)
  propertiesArray = propertiesArray.filter(
    o => o[1] || o[1] === 0 || o[1] === false
  )
  propertiesArray = sortBy(propertiesArray, e => e[0]).filter(
    ([key, value]) => value || value === 0 || value === false
  )
  const relationsTitleText =
    relations.length > 1 ? 'Beziehungen:' : 'Beziehung:'
  const relationsTitle = `${relations.length} ${relationsTitleText}`

  return (
    <ErrorBoundary>
      <StyledCard>
        <StyledCardActions
          disableActionSpacing
          onClick={() => setExpanded(!expanded)}
        >
          <CardActionTitle>{pcname}</CardActionTitle>
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
          <PC pCO={pCO} />
          <CardText>
            {propertiesArray.map(([key, value]) => (
              <PropertyReadOnly key={key} value={value} label={key} />
            ))}
            {relations &&
              relations.length > 0 && (
                <RelationTitle>{relationsTitle}</RelationTitle>
              )}
            {relations.map((relation, index) => (
              <Relation
                key={relation.id}
                relation={relation}
                intermediateRelation={index < relations.length - 1}
              />
            ))}
          </CardText>
        </Collapse>
      </StyledCard>
    </ErrorBoundary>
  )
}

export default enhance(PCO)
