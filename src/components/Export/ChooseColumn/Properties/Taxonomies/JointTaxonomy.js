import React, { useState, useCallback } from 'react'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import Collapse from '@material-ui/core/Collapse'
import IconButton from '@material-ui/core/IconButton'
import Icon from '@material-ui/core/Icon'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import styled from 'styled-components'
import ErrorBoundary from 'react-error-boundary'
import ReactResizeDetector from 'react-resize-detector'

import AllChooser from './Taxonomy/AllChooser'
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
  transform: ${props => (props['data-expanded'] ? 'rotate(180deg)' : 'none')};
`
const CardActionTitle = styled.div`
  padding-left: 8px;
  font-weight: bold;
  word-break: break-word;
`
const StyledCollapse = styled(Collapse)`
  display: flex;
  flex-direction: column;
  padding: 8px 14px;
`
const PropertiesContainer = styled.div`
  column-width: ${props =>
    props['data-width'] > 2 * constants.export.properties.columnWidth
      ? `${constants.export.properties.columnWidth}px`
      : 'auto'};
`
const Count = styled.span`
  font-size: x-small;
  padding-left: 5px;
`

const JointTaxonomy = ({ jointTaxProperties }) => {
  const [expanded, setExpanded] = useState(false)
  const onClickActions = useCallback(() => setExpanded(!expanded), [expanded])
  const width = typeof window !== 'undefined' ? window.innerWidth - 84 : 500

  return (
    <ErrorBoundary>
      <StyledCard key="jointTax">
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
        <StyledCollapse in={expanded} timeout="auto" unmountOnExit>
          {jointTaxProperties.length > 1 && (
            <AllChooser properties={jointTaxProperties} />
          )}
          <PropertiesContainer data-width={width}>
            <Properties properties={jointTaxProperties} />
          </PropertiesContainer>
        </StyledCollapse>
      </StyledCard>
    </ErrorBoundary>
  )
}

export default JointTaxonomy
