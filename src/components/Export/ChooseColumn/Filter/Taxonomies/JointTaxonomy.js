// @flow
import React from 'react'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import Collapse from '@material-ui/core/Collapse'
import IconButton from '@material-ui/core/IconButton'
import Icon from '@material-ui/core/Icon'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import styled from 'styled-components'
import compose from 'recompose/compose'
import withState from 'recompose/withState'

import TaxField from '../TaxField'
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
const Count = styled.span`
  font-size: x-small;
  padding-left: 5px;
`
const PropertiesContainer = styled.div`
  margin: 8px 0;
  padding-bottom: 10px;
  column-width: ${props =>
    props['data-width'] > 2 * constants.export.properties.columnWidth
      ? `${constants.export.properties.columnWidth}px`
      : 'auto'};
`

const enhance = compose(withState('expanded', 'setExpanded', false))

const JointTaxonomiesCard = ({
  expanded,
  setExpanded,
  jointTaxProperties,
}: {
  expanded: Boolean,
  setExpanded: () => void,
  jointTaxProperties: Array<Object>,
}) => (
  <ErrorBoundary>
    <StyledCard>
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
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <PropertiesContainer data-width={window.innerWidth - 84}>
          {jointTaxProperties.map(field => (
            <TaxField
              key={`${field.propertyName}${field.jsontype}`}
              taxname="Taxonomie"
              pname={field.propertyName}
              jsontype={field.jsontype}
            />
          ))}
        </PropertiesContainer>
      </Collapse>
    </StyledCard>
  </ErrorBoundary>
)

export default enhance(JointTaxonomiesCard)
