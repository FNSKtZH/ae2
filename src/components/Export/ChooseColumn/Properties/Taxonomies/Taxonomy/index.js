// @flow
import React, { Fragment } from 'react'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Collapse from '@material-ui/core/Collapse'
import IconButton from '@material-ui/core/IconButton'
import Icon from '@material-ui/core/Icon'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import styled from 'styled-components'
import get from 'lodash/get'
import groupBy from 'lodash/groupBy'
import compose from 'recompose/compose'
import withState from 'recompose/withState'

import AllTaxChooser from '../AllTaxChooser'
import TaxChooser from '../TaxChooser'
import constants from '../../../../../../modules/constants'
import propsByTaxData from '../../../propsByTaxData'
import exportTaxonomiesData from '../../../../exportTaxonomiesData'
import data from '../../data'
import ErrorBoundary from '../../../../../shared/ErrorBoundary'

const StyledCard = styled(Card)`
  margin: 0;
  background-color: rgb(255, 243, 224) !important;
`
const StyledCardActions = styled(CardActions)`
  justify-content: space-between;
  cursor: pointer;
  background-color: #fff3e0;
  border-bottom: 1px solid #ebebeb;
  padding-top: 4px !important;
  padding-bottom: 4px !important;
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
  display: flex;
  flex-direction: column;
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

const enhance = compose(
  exportTaxonomiesData,
  data,
  propsByTaxData,
  withState(
    'expanded',
    'setExpanded',
    ({ initiallyExpanded }) => initiallyExpanded
  )
)

const Properties = ({
  expanded,
  setExpanded,
  propsByTaxData,
  data,
  tax,
}: {
  expanded: Boolean,
  setExpanded: () => void,
  propsByTaxData: Object,
  data: Object,
  tax: String,
}) => {
  const taxProperties = get(
    propsByTaxData,
    'taxPropertiesByTaxonomiesFunction.nodes',
    []
  )
  const taxPropertiesByTaxonomy = groupBy(taxProperties, 'taxonomyName')

  return (
    <ErrorBoundary>
      <StyledCard>
        <StyledCardActions
          disableActionSpacing
          onClick={() => setExpanded(!expanded)}
        >
          <CardActionTitle>
            {tax}
            <Count>{`(${taxPropertiesByTaxonomy[tax].length} ${
              taxPropertiesByTaxonomy[tax].length === 1 ? 'Feld' : 'Felder'
            })`}</Count>
            <CardActionIconButton
              data-expanded={expanded}
              aria-expanded={expanded}
              aria-label="Show more"
            >
              <Icon>
                <ExpandMoreIcon />
              </Icon>
            </CardActionIconButton>
          </CardActionTitle>
        </StyledCardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <StyledCardContent>
            <Fragment>
              {taxPropertiesByTaxonomy[tax].length > 1 && (
                <AllTaxChooser properties={taxPropertiesByTaxonomy[tax]} />
              )}
              <PropertiesContainer data-width={window.innerWidth - 84}>
                {taxPropertiesByTaxonomy[tax].map(field => (
                  <TaxChooser
                    key={`${field.propertyName}${field.jsontype}`}
                    taxname={field.taxonomyName}
                    pname={field.propertyName}
                    jsontype={field.jsontype}
                    count={field.count}
                  />
                ))}
              </PropertiesContainer>
            </Fragment>
          </StyledCardContent>
        </Collapse>
      </StyledCard>
    </ErrorBoundary>
  )
}

export default enhance(Properties)
