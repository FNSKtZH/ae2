// @flow
import React from 'react'
import Card, { CardActions, CardContent } from 'material-ui/Card'
import Collapse from 'material-ui/transitions/Collapse'
import IconButton from 'material-ui/IconButton'
import Icon from 'material-ui/Icon'
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
  height: auto !important;
`
const CardActionIconButton = styled(IconButton)`
  transform: ${props => (props['data-expanded'] ? 'rotate(180deg)' : 'none')};
`
const CardActionTitle = styled.div`
  padding-left: 8px;
  font-weight: bold;
  word-break: break-word;
`
const StyledCardContent = styled(CardContent)`
  padding: 0 16px 0 0 !important;
  margin: -10px 0 0 0;
  li {
    margin-top: 4px;
  }
`

const enhance = compose(withState('expanded', 'setExpanded', false))

const HowToTaxonomies = ({
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
        <Icon>
          <ExpandMoreIcon />
        </Icon>
      </CardActionIconButton>
    </StyledCardActions>
    <Collapse in={expanded} timeout="auto" unmountOnExit>
      <StyledCardContent>
        <ul>
          <li>Wählen Sie Arten oder Lebensräume...</li>
          <li>...und darin Taxonomien</li>
          <li>...dann werden ihre Eigenschaften aufgebaut</li>
          <li>...und Sie können filtern und Eigenschaften wählen</li>
        </ul>
      </StyledCardContent>
    </Collapse>
  </StyledCard>
)

export default enhance(HowToTaxonomies)
