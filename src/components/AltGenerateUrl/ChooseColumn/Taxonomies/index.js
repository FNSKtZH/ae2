// @flow
import React, { Fragment } from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import Collapse from '@material-ui/core/Collapse'
import IconButton from '@material-ui/core/IconButton'
import Icon from '@material-ui/core/Icon'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import styled from 'styled-components'
import { withApollo } from 'react-apollo'
import get from 'lodash/get'
import groupBy from 'lodash/groupBy'
import sumBy from 'lodash/sumBy'
import compose from 'recompose/compose'

import JointTaxonomy from './JointTaxonomy'
import propsByTaxData from '../propsByTaxData'
import data from '../data'
import ErrorBoundary from '../../../shared/ErrorBoundary'
import constants from '../../../../modules/constants'

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
const StyledSnackbar = styled(Snackbar)`
  div {
    min-width: auto;
    background-color: #2e7d32 !important;
  }
`

const enhance = compose(withApollo, data, propsByTaxData)

const Properties = ({
  propsByTaxData,
  data,
  taxonomiesExpanded,
  onToggleTaxonomies,
}: {
  propsByTaxData: Object,
  data: Object,
  taxonomiesExpanded: Boolean,
  onToggleTaxonomies: () => {},
}) => {
  const taxProperties = get(
    propsByTaxData,
    'taxPropertiesByTaxonomiesFunction.nodes',
    []
  )
  const taxPropertiesByTaxonomy = groupBy(taxProperties, 'taxonomyName')
  const taxPropertiesFields = groupBy(taxProperties, 'propertyName')
  const taxCount = Object.keys(taxPropertiesByTaxonomy).length
  const taxFieldsCount = Object.keys(taxPropertiesFields).length
  let jointTaxProperties = []
  if (taxCount > 1) {
    jointTaxProperties = Object.values(
      groupBy(taxProperties, t => t.propertyName)
    ).map(t => ({
      count: sumBy(t, x => Number(x.count)),
      jsontype: t[0].jsontype,
      propertyName: t[0].propertyName,
      taxonomies: t.map(x => x.taxonomyName),
      taxname: 'Taxonomie',
    }))
  }

  return (
    <ErrorBoundary>
      <Fragment>
        <StyledCard>
          <StyledCardActions disableActionSpacing onClick={onToggleTaxonomies}>
            <CardActionTitle>
              Taxonomie{
                <Count>
                  {taxFieldsCount > 0
                    ? `(${taxFieldsCount} Felder aus: ${constants.altTaxonomies.join(
                        ', '
                      )})`
                    : '(...)'}
                </Count>
              }
            </CardActionTitle>
            <CardActionIconButton
              data-expanded={taxonomiesExpanded}
              aria-expanded={taxonomiesExpanded}
              aria-label="Show more"
            >
              <Icon>
                <ExpandMoreIcon />
              </Icon>
            </CardActionIconButton>
          </StyledCardActions>
          <Collapse in={taxonomiesExpanded} timeout="auto" unmountOnExit>
            <JointTaxonomy jointTaxProperties={jointTaxProperties} />
          </Collapse>
        </StyledCard>
        <StyledSnackbar
          open={propsByTaxData.loading || data.loading}
          message="Lade Daten. Das dauert eine Weile..."
        />
      </Fragment>
    </ErrorBoundary>
  )
}

export default enhance(Properties)
