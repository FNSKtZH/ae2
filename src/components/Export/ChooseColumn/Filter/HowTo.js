// @flow
import React from 'react'
import Card, { CardActions, CardContent } from 'material-ui-next/Card'
import Collapse from 'material-ui-next/transitions/Collapse'
import IconButton from 'material-ui-next/IconButton'
import ExpandMoreIcon from 'material-ui-icons/ExpandMore'
import compose from 'recompose/compose'
import withState from 'recompose/withState'
import styled from 'styled-components'

const StyledCard = styled(Card)`
  margin: 10px 0;
  background-color: rgb(255, 243, 224) !important;
`
const StyledCardActions = styled(CardActions)`
  justify-content: space-between;
  cursor: pointer;
`
const CardActionIconButton = styled(IconButton)`
  transform: ${props => (props['data-expanded'] ? 'rotate(180deg)' : 'none')};
`
const CardActionTitle = styled.div`
  padding-left: 8px;
  font-weight: bold;
`
const StyledCardContent = styled(CardContent)`
  padding: 0 16px 0 0 !important;
  margin: -10px 0 0 0;
`

const enhance = compose(withState('expanded', 'setExpanded', false))

const HowToFilter = ({
  expanded,
  setExpanded,
}: {
  expanded: Boolean,
  setExpanded: () => void,
}) => (
  <StyledCard>
    <StyledCardActions
      disableActionSpacing
      onClick={() => setExpanded(!expanded)}
    >
      <CardActionTitle>So geht's</CardActionTitle>
      <CardActionIconButton
        data-expanded={expanded}
        aria-expanded={expanded}
        aria-label="Show more"
      >
        <ExpandMoreIcon />
      </CardActionIconButton>
    </StyledCardActions>
    <Collapse in={expanded} timeout="auto" unmountOnExit>
      <StyledCardContent>
        <ul>
          <li>
            Nachfolgend sind alle Eigenschaften aufgelistet, die in den
            gewählten Gruppen vorkommen
          </li>
          <li>
            Erfassen Sie in den Eigenschaften Ihrer Wahl die gewünschten
            Filter-Kriterien...
          </li>
          <li>
            ...und wählen Sie danach unter "3. Eigenschaften wählen", welche
            Eigenschaften exportiert werden sollen
          </li>
        </ul>
      </StyledCardContent>
    </Collapse>
  </StyledCard>
)

export default enhance(HowToFilter)
