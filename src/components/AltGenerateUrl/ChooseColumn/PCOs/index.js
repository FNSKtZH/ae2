// @flow
import React from 'react'
import Card, { CardActions } from 'material-ui/Card'
import Collapse from 'material-ui/transitions/Collapse'
import IconButton from 'material-ui/IconButton'
import Icon from 'material-ui/Icon'
import ExpandMoreIcon from 'material-ui-icons/ExpandMore'
import styled from 'styled-components'
import get from 'lodash/get'
import groupBy from 'lodash/groupBy'
import compose from 'recompose/compose'

import PCO from './PCO'
import propsByTaxData from '../propsByTaxData'
import exportTaxonomiesData from '../../exportTaxonomiesData'
import ErrorBoundary from '../../../shared/ErrorBoundary'

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
const Count = styled.span`
  font-size: x-small;
  padding-left: 5px;
`

const enhance = compose(exportTaxonomiesData, propsByTaxData)

const PCOs = ({
  propsByTaxData,
  pcoExpanded,
  onTogglePco,
}: {
  propsByTaxData: Object,
  pcoExpanded: Boolean,
  onTogglePco: () => {},
}) => {
  const pcoProperties = get(
    propsByTaxData,
    'pcoPropertiesByTaxonomiesFunction.nodes',
    []
  )
  const pcoPropertiesByPropertyCollection = groupBy(
    pcoProperties,
    'propertyCollectionName'
  )
  const pcoPropertiesFields = groupBy(pcoProperties, 'propertyName')
  const pCCount = Object.keys(pcoPropertiesByPropertyCollection).length

  return (
    <ErrorBoundary>
      <StyledCard>
        <StyledCardActions disableActionSpacing onClick={onTogglePco}>
          <CardActionTitle>
            Eigenschaftensammlungen{pCCount > 0 && (
              <Count>{`(${pCCount} Sammlungen, ${
                Object.keys(pcoPropertiesFields).length
              } ${
                Object.keys(pcoPropertiesFields).length === 1
                  ? 'Feld'
                  : 'Felder'
              })`}</Count>
            )}
          </CardActionTitle>
          <CardActionIconButton
            data-expanded={pcoExpanded}
            aria-expanded={pcoExpanded}
            aria-label="Show more"
          >
            <Icon>
              <ExpandMoreIcon />
            </Icon>
          </CardActionIconButton>
        </StyledCardActions>
        <Collapse in={pcoExpanded} timeout="auto" unmountOnExit>
          {Object.keys(pcoPropertiesByPropertyCollection).map(pc => (
            <PCO key={pc} pc={pc} />
          ))}
        </Collapse>
      </StyledCard>
    </ErrorBoundary>
  )
}

export default enhance(PCOs)
