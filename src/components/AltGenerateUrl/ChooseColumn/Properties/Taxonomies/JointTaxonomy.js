// @flow
import React from 'react'
import Card, { CardActions } from 'material-ui/Card'
import Collapse from 'material-ui/transitions/Collapse'
import IconButton from 'material-ui/IconButton'
import Icon from 'material-ui/Icon'
import ExpandMoreIcon from 'material-ui-icons/ExpandMore'
import styled from 'styled-components'
import compose from 'recompose/compose'
import withState from 'recompose/withState'

import AllTaxChooser from './AllTaxChooser'
import TaxChooser from './TaxChooser'
import constants from '../../../../../modules/constants'
import ErrorBoundary from '../../../../shared/ErrorBoundary'

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

const enhance = compose(withState('expanded', 'setExpanded', false))

const JointTaxonomy = ({
  expanded,
  setExpanded,
  jointTaxProperties,
}: {
  expanded: Boolean,
  setExpanded: () => void,
  jointTaxProperties: Array<Object>,
}) => (
  <ErrorBoundary>
    <StyledCard key="jointTax">
      <StyledCardActions
        disableActionSpacing
        onClick={() => setExpanded(!expanded)}
      >
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
          <AllTaxChooser properties={jointTaxProperties} />
        )}
        <PropertiesContainer data-width={window.innerWidth - 84}>
          {jointTaxProperties.map(field => (
            <TaxChooser
              key={`${field.propertyName}${field.jsontype}`}
              taxname={'Taxonomie'}
              pname={field.propertyName}
              jsontype={field.jsontype}
              count={field.count}
            />
          ))}
        </PropertiesContainer>
      </StyledCollapse>
    </StyledCard>
  </ErrorBoundary>
)

export default enhance(JointTaxonomy)
