// @flow
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
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import PcoList from './PcoList'
import ErrorBoundary from '../../../shared/ErrorBoundary'
import constants from '../../../../modules/constants'

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
    pcoPropertiesByTaxonomiesFunction(taxonomyNames: $exportTaxonomies) {
      nodes {
        propertyCollectionName
        propertyName
        jsontype
        count
      }
    }
  }
`

const PCOs = ({
  pcoExpanded,
  onTogglePco,
}: {
  pcoExpanded: Boolean,
  onTogglePco: () => {},
}) => {
  const { data: propsByTaxData } = useQuery(propsByTaxQuery, {
    suspend: false,
    variables: {
      exportTaxonomies: constants.altTaxonomies,
    },
  })

  const pcoProperties = get(
    propsByTaxData,
    'pcoPropertiesByTaxonomiesFunction.nodes',
    [],
  )
  const pcoPropertiesByPropertyCollection = groupBy(
    pcoProperties,
    'propertyCollectionName',
  )
  const pcoPropertiesFields = groupBy(pcoProperties, 'propertyName')
  const pCCount = Object.keys(pcoPropertiesByPropertyCollection).length
  const pcoPropertiesFieldsCount = Object.keys(pcoPropertiesFields).length

  return (
    <ErrorBoundary>
      <Container>
        <StyledCard>
          <StyledCardActions disableSpacing onClick={onTogglePco}>
            <CardActionTitle>
              Eigenschaftensammlungen
              {
                <Count>
                  {pcoPropertiesFieldsCount > 0
                    ? `(${pCCount} Sammlungen, ${pcoPropertiesFieldsCount} Felder)`
                    : '(...)'}
                </Count>
              }
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
            <PcoList pcNames={Object.keys(pcoPropertiesByPropertyCollection)} />
          </Collapse>
        </StyledCard>
      </Container>
    </ErrorBoundary>
  )
}

export default PCOs
