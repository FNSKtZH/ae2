// @flow
import React from 'react'
import Card, { CardActions } from 'material-ui/Card'
import Collapse from 'material-ui/transitions/Collapse'
import IconButton from 'material-ui/IconButton'
import Icon from 'material-ui/Icon'
import ExpandMoreIcon from 'material-ui-icons/ExpandMore'
import get from 'lodash/get'
import compose from 'recompose/compose'
import withState from 'recompose/withState'
import styled from 'styled-components'

import PropertyCollection from '../ObjectPropertyCollection'
import ErrorBoundary from '../../shared/ErrorBoundary'

const StyledCard = styled(Card)`
  margin: 0;
  background-color: #ffe0b2 !important;
`
const StyledCardActions = styled(CardActions)`
  justify-content: space-between;
  cursor: pointer;
  background-color: #ffe0b2;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  height: auto !important;
  padding: 8px 0 8px 16px !important;
`
const CardActionIconButton = styled(IconButton)`
  transform: ${props => (props['data-expanded'] ? 'rotate(180deg)' : 'none')};
`
const CardActionTitle = styled.div`
  font-weight: normal;
  word-break: break-word;
`

const enhance = compose(withState('expanded', 'setExpanded', false))

const PC = ({
  expanded,
  setExpanded,
  pCO,
}: {
  pCO: Object,
  expanded: Boolean,
  setExpanded: () => void,
}) => {
  const pC = get(pCO, 'propertyCollectionByPropertyCollectionId', {})

  return (
    <ErrorBoundary>
      <StyledCard>
        <StyledCardActions
          disableActionSpacing
          onClick={() => setExpanded(!expanded)}
        >
          <CardActionTitle>{get(pC, 'description', '')}</CardActionTitle>
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
          <PropertyCollection pC={pC} />
        </Collapse>
      </StyledCard>
    </ErrorBoundary>
  )
}

export default enhance(PC)
