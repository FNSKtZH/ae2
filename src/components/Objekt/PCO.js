// @flow
import React from 'react'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import Collapse from '@material-ui/core/Collapse'
import IconButton from '@material-ui/core/IconButton'
import Icon from '@material-ui/core/Icon'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import InfoOutlineIcon from '@material-ui/icons/InfoOutline'
import InfoIcon from '@material-ui/icons/Info'
import get from 'lodash/get'
import sortBy from 'lodash/sortBy'
import compose from 'recompose/compose'
import withState from 'recompose/withState'
import styled from 'styled-components'

import PCDescription from '../shared/PCDescription'
import PropertyReadOnly from '../shared/PropertyReadOnly'
import PropertyReadOnlyStacked from '../shared/PropertyReadOnlyStacked'
import Relation from './Relation'
import ErrorBoundary from '../shared/ErrorBoundary'

const Container = styled.div`
  margin: 10px 0;
`
const RelationTitle = styled.div`
  font-weight: bold;
  border-bottom: 1px solid #c6c6c6;
  padding: 5px;
  border-radius: 4px 4px 0 0;
  margin-bottom: 10px;
`
const StyledCard = styled(Card)`
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
const CardActionsButtons = styled.div`
  display: flex;
`
const CardText = styled.div`
  padding: 5px 16px;
  column-width: 500px;
`

const enhance = compose(
  withState('expanded', 'setExpanded', false),
  withState('pCDescriptionExpanded', 'setPCDescriptionExpanded', false)
)

const PCO = ({
  expanded,
  setExpanded,
  pCDescriptionExpanded,
  setPCDescriptionExpanded,
  pCO,
  relations,
  stacked,
}: {
  expanded: Boolean,
  setExpanded: () => void,
  pCDescriptionExpanded: Boolean,
  setPCDescriptionExpanded: () => void,
  pCO: Object,
  relations: Array<Object>,
  stacked: Boolean,
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
      <Container>
        <StyledCard>
          <StyledCardActions
            disableActionSpacing
            onClick={() => setExpanded(!expanded)}
          >
            <CardActionTitle>{pcname}</CardActionTitle>
            <CardActionsButtons>
              <IconButton
                data-expanded={pCDescriptionExpanded}
                aria-expanded={pCDescriptionExpanded}
                aria-label="über diese Eigenschaften-Sammlung"
                title={
                  pCDescriptionExpanded
                    ? 'Beschreibung der Eigenschaften-Sammlung schliessen'
                    : 'Beschreibung der Eigenschaften-Sammlung öffnen'
                }
                onClick={event => {
                  event.stopPropagation()
                  setPCDescriptionExpanded(!pCDescriptionExpanded)
                  setExpanded(true)
                }}
              >
                <Icon>
                  {!pCDescriptionExpanded && <InfoOutlineIcon />}
                  {pCDescriptionExpanded && <InfoIcon />}
                </Icon>
              </IconButton>
              <CardActionIconButton
                data-expanded={expanded}
                aria-expanded={expanded}
                aria-label="Show more"
              >
                <Icon>
                  <ExpandMoreIcon />
                </Icon>
              </CardActionIconButton>
            </CardActionsButtons>
          </StyledCardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            {pCDescriptionExpanded && <PCDescription pC={pC} />}
            <CardText>
              {propertiesArray.map(
                ([key, value]) =>
                  stacked ? (
                    <PropertyReadOnlyStacked
                      key={key}
                      value={value}
                      label={key}
                    />
                  ) : (
                    <PropertyReadOnly key={key} value={value} label={key} />
                  )
              )}
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
      </Container>
    </ErrorBoundary>
  )
}

export default enhance(PCO)
