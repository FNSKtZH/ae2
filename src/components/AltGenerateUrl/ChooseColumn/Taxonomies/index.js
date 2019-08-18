import React from 'react'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import Collapse from '@material-ui/core/Collapse'
import IconButton from '@material-ui/core/IconButton'
import Icon from '@material-ui/core/Icon'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import styled from 'styled-components'
import get from 'lodash/get'
import groupBy from 'lodash/groupBy'
import sumBy from 'lodash/sumBy'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import JointTaxonomy from './JointTaxonomy'
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

const propsByTaxQuery = gql`
  query propsByTaxDataQuery($exportTaxonomies: [String]) {
    taxPropertiesByTaxonomiesFunction(taxonomyNames: $exportTaxonomies) {
      nodes {
        taxonomyName
        propertyName
        jsontype
        count
      }
    }
  }
`

const Properties = ({ taxonomiesExpanded, onToggleTaxonomies }) => {
  const { data: propsByTaxData, error: propsByTaxError } = useQuery(
    propsByTaxQuery,
    {
      variables: {
        exportTaxonomies: constants.altTaxonomies,
      },
    },
  )

  const taxProperties = get(
    propsByTaxData,
    'taxPropertiesByTaxonomiesFunction.nodes',
    [],
  )
  const taxPropertiesByTaxonomy = groupBy(taxProperties, 'taxonomyName')
  const taxPropertiesFields = groupBy(taxProperties, 'propertyName')
  const taxCount = Object.keys(taxPropertiesByTaxonomy).length
  const taxFieldsCount = Object.keys(taxPropertiesFields).length
  let jointTaxProperties = []
  if (taxCount > 1) {
    jointTaxProperties = Object.values(
      groupBy(taxProperties, t => t.propertyName),
    ).map(t => ({
      count: sumBy(t, x => Number(x.count)),
      jsontype: t[0].jsontype,
      propertyName: t[0].propertyName,
      taxonomies: t.map(x => x.taxonomyName),
      taxname: 'Taxonomie',
    }))
  }

  if (propsByTaxError) return `Error fetching data: ${propsByTaxError.message}`

  return (
    <ErrorBoundary>
      <>
        <StyledCard>
          <StyledCardActions disableSpacing onClick={onToggleTaxonomies}>
            <CardActionTitle>
              Taxonomie
              {
                <Count>
                  {taxFieldsCount > 0
                    ? `(${taxFieldsCount} Felder aus: ${constants.altTaxonomies.join(
                        ', ',
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
      </>
    </ErrorBoundary>
  )
}

export default Properties
