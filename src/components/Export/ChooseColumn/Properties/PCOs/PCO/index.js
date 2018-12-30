// @flow
import React, { useState, useCallback } from 'react'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import Collapse from '@material-ui/core/Collapse'
import IconButton from '@material-ui/core/IconButton'
import Icon from '@material-ui/core/Icon'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import styled from 'styled-components'
import get from 'lodash/get'
import groupBy from 'lodash/groupBy'
import compose from 'recompose/compose'

import AllChooser from './AllChooser'
import Chooser from './Chooser'
import constants from '../../../../../../modules/constants'
import withPropsByTaxData from '../../../withPropsByTaxData'
import withExportTaxonomiesData from '../../../../withExportTaxonomiesData'
import ErrorBoundary from '../../../../../shared/ErrorBoundary'

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
const PropertiesContainer = styled.div`
  column-width: ${props =>
    props['data-width'] > 2 * constants.export.properties.columnWidth
      ? `${constants.export.properties.columnWidth}px`
      : 'auto'};
`
const StyledCollapse = styled(Collapse)`
  padding: 8px 20px;
`
const Count = styled.span`
  font-size: x-small;
  padding-left: 5px;
`

const enhance = compose(
  withExportTaxonomiesData,
  withPropsByTaxData,
)

const PCO = ({
  propsByTaxData,
  pcoExpanded,
  onTogglePco,
  pc,
}: {
  propsByTaxData: Object,
  pcoExpanded: Boolean,
  onTogglePco: () => {},
  pc: Object,
}) => {
  const [expanded, setExpanded] = useState(false)
  const onClickActions = useCallback(() => setExpanded(!expanded), [expanded])

  const pcoProperties = get(
    propsByTaxData,
    'pcoPropertiesByTaxonomiesFunction.nodes',
    [],
  )
  const pcoPropertiesByPropertyCollection = groupBy(
    pcoProperties,
    'propertyCollectionName',
  )

  return (
    <ErrorBoundary>
      <StyledCard>
        <StyledCardActions disableActionSpacing onClick={onClickActions}>
          <CardActionTitle>
            {pc}
            <Count>{`(${pcoPropertiesByPropertyCollection[pc].length} ${
              pcoPropertiesByPropertyCollection[pc].length === 1
                ? 'Feld'
                : 'Felder'
            })`}</Count>
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
          <>
            {pcoPropertiesByPropertyCollection[pc].length > 1 && (
              <AllChooser properties={pcoPropertiesByPropertyCollection[pc]} />
            )}
            <PropertiesContainer data-width={window.innerWidth - 84}>
              {pcoPropertiesByPropertyCollection[pc].map(field => (
                <Chooser
                  key={`${field.propertyName}${field.jsontype}`}
                  pcname={field.propertyCollectionName}
                  pname={field.propertyName}
                  jsontype={field.jsontype}
                  count={field.count}
                />
              ))}
            </PropertiesContainer>
          </>
        </StyledCollapse>
      </StyledCard>
    </ErrorBoundary>
  )
}

export default enhance(PCO)
