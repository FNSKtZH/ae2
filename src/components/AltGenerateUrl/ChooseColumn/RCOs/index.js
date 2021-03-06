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
import { useQuery, gql } from '@apollo/client'

import ErrorBoundary from '../../../shared/ErrorBoundary'
import RcoList from './RcoList'
import getConstants from '../../../../modules/constants'
const constants = getConstants()

const Container = styled.div`
  margin: 10px 0;
`
const StyledCard = styled(Card)`
  background-color: rgb(255, 243, 224) !important;
`
const StyledCardActions = styled(CardActions)`
  justify-content: space-between;
  cursor: pointer;
  height: auto !important;
  background-color: #ffcc80;
  display: flex;
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

const propsByTaxQuery = gql`
  query propsByTaxDataQuery($exportTaxonomies: [String]) {
    rcoPropertiesByTaxonomiesFunction(taxonomyNames: $exportTaxonomies) {
      nodes {
        propertyCollectionName
        relationType
        propertyName
        jsontype
        count
      }
    }
  }
`

const RCOs = ({ rcoExpanded, onToggleRco }) => {
  const { data: propsByTaxData, error: propsByTaxError } = useQuery(
    propsByTaxQuery,
    {
      variables: {
        exportTaxonomies: constants.altTaxonomies,
      },
    },
  )

  const rcoProperties = get(
    propsByTaxData,
    'rcoPropertiesByTaxonomiesFunction.nodes',
    [],
  )

  const rcoPropertiesByPropertyCollection = groupBy(rcoProperties, (x) => {
    if (x.propertyCollectionName.includes(x.relationType)) {
      return x.propertyCollectionName
    }
    return `${x.propertyCollectionName}: ${x.relationType}`
  })
  const rcoPropertiesFields = groupBy(rcoProperties, 'propertyName')
  const rCCount = Object.keys(rcoPropertiesByPropertyCollection).length
  const rcoPropertiesFieldsCount = Object.keys(rcoPropertiesFields).length

  if (propsByTaxError) return `Error fetching data: ${propsByTaxError.message}`

  return (
    <ErrorBoundary>
      <Container>
        <StyledCard>
          <StyledCardActions disableSpacing onClick={onToggleRco}>
            <CardActionTitle>
              Beziehungssammlungen
              {
                <Count>
                  {rcoPropertiesFieldsCount
                    ? `(${rCCount} Sammlungen, ${rcoPropertiesFieldsCount} Felder)`
                    : '(...)'}
                </Count>
              }
            </CardActionTitle>
            <CardActionIconButton
              data-expanded={rcoExpanded}
              aria-expanded={rcoExpanded}
              aria-label="Show more"
            >
              <Icon>
                <ExpandMoreIcon />
              </Icon>
            </CardActionIconButton>
          </StyledCardActions>
          <Collapse in={rcoExpanded} timeout="auto" unmountOnExit>
            <RcoList rcNames={Object.keys(rcoPropertiesByPropertyCollection)} />
          </Collapse>
        </StyledCard>
      </Container>
    </ErrorBoundary>
  )
}

export default RCOs
