import React, { useState, useCallback } from 'react'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import Collapse from '@material-ui/core/Collapse'
import IconButton from '@material-ui/core/IconButton'
import Icon from '@material-ui/core/Icon'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import styled from 'styled-components'
import ErrorBoundary from 'react-error-boundary'
import { withResizeDetector } from 'react-resize-detector'

import Properties from './Properties'
import getConstants from '../../../../../modules/constants'
const constants = getConstants()

const StyledCard = styled(Card)`
  margin: 0;
  background-color: rgb(255, 243, 224) !important;
`
const StyledCardActions = styled(CardActions)`
  justify-content: space-between;
  cursor: pointer;
  height: auto !important;
  background-color: #fff3e0;
  border-bottom: 1px solid #ebebeb;
`
const CardActionIconButton = styled(IconButton)`
  transform: ${(props) => (props['data-expanded'] ? 'rotate(180deg)' : 'none')};
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
const PropertiesContainer = styled.div`
  margin: 8px 0;
  padding-bottom: 10px;
  display: flex;
  flex-wrap: wrap;
`

const JointTaxonomiesCard = ({ jointTaxProperties, width = 500 }) => {
  const [expanded, setExpanded] = useState(false)
  const onClickActions = useCallback(() => setExpanded(!expanded), [expanded])

  const columns = Math.floor(width / constants.export.properties.columnWidth)

  return (
    <ErrorBoundary>
      <StyledCard>
        <StyledCardActions disableSpacing onClick={onClickActions}>
          <CardActionTitle>
            {`Gemeinsame Felder`}
            <Count>{`(${jointTaxProperties.length})`}</Count>
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
          <PropertiesContainer>
            <Properties properties={jointTaxProperties} columns={columns} />
          </PropertiesContainer>
        </Collapse>
      </StyledCard>
    </ErrorBoundary>
  )
}

export default withResizeDetector(JointTaxonomiesCard)
