// @flow
import React from 'react'
import Card, { CardActions } from 'material-ui/Card'
import Collapse from 'material-ui/transitions/Collapse'
import IconButton from 'material-ui/IconButton'
import Icon from 'material-ui/Icon'
import ExpandMoreIcon from 'material-ui-icons/ExpandMore'
import compose from 'recompose/compose'
import withState from 'recompose/withState'
import get from 'lodash/get'
import styled from 'styled-components'

import exportPcoPropertiesData from '../exportPcoPropertiesData'
import exportRcoPropertiesData from '../exportRcoPropertiesData'
import exportTaxPropertiesData from '../exportTaxPropertiesData'

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
const StyledCollapse = styled(Collapse)`
  padding: 0 16px 16px 16px;
`

const enhance = compose(
  exportTaxPropertiesData,
  exportPcoPropertiesData,
  exportRcoPropertiesData,
  withState('expanded', 'setExpanded', false)
)

const HowToPreview = ({
  expanded,
  setExpanded,
  exportTaxPropertiesData,
  exportPcoPropertiesData,
  exportRcoPropertiesData,
}: {
  expanded: Boolean,
  setExpanded: () => void,
  exportTaxPropertiesData: Object,
  exportPcoPropertiesData: Object,
  exportRcoPropertiesData: Object,
}) => {
  const exportTaxProperties = get(
    exportTaxPropertiesData,
    'exportTaxProperties',
    []
  )
  const exportPcoProperties = get(
    exportPcoPropertiesData,
    'exportPcoProperties',
    []
  )
  const exportRcoProperties = get(
    exportRcoPropertiesData,
    'exportRcoProperties',
    []
  )
  const dataChoosen =
    [...exportTaxProperties, ...exportPcoProperties, ...exportRcoProperties]
      .length > 0

  if (dataChoosen) return null
  return (
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
      <StyledCollapse in={expanded} timeout="auto" unmountOnExit>
        Sobald Sie Taxonomien und Eigenschaften gewählt haben, werden die Daten
        hier angezeigt.
      </StyledCollapse>
    </StyledCard>
  )
}

export default enhance(HowToPreview)
