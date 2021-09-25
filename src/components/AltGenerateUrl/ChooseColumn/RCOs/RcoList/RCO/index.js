import React, { Fragment, useState } from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import Icon from '@mui/material/Icon'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import styled from 'styled-components'
import get from 'lodash/get'
import groupBy from 'lodash/groupBy'
import { useQuery, gql } from '@apollo/client'
import { withResizeDetector } from 'react-resize-detector'

import ErrorBoundary from '../../../../../shared/ErrorBoundary'
import AllRcoChooser from './AllRcoChooser'
import RcoChooserList from './RcoChooserList'
import getConstants from '../../../../../../modules/constants'
const constants = getConstants()

const PropertiesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`
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
const StyledCollapse = styled(Collapse)`
  padding: 8px 20px;
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

const RCO = ({ pc, width = 500 }) => {
  const { data: propsByTaxData, error: propsByTaxError } = useQuery(
    propsByTaxQuery,
    {
      variables: {
        exportTaxonomies: constants.altTaxonomies,
      },
    },
  )

  const [expanded, setExpanded] = useState(false)

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

  const columns = Math.floor(width / constants.export.properties.columnWidth)

  if (propsByTaxError) return `Error fetching data: ${propsByTaxError.message}`

  return (
    <ErrorBoundary>
      <StyledCard>
        <StyledCardActions
          disableSpacing
          onClick={() => setExpanded(!expanded)}
        >
          <CardActionTitle>
            {pc}
            <Count>{`(${rcoPropertiesByPropertyCollection[pc].length} ${
              rcoPropertiesByPropertyCollection[pc].length === 1
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
          <Fragment>
            {rcoPropertiesByPropertyCollection[pc].length > 1 && (
              <AllRcoChooser
                properties={rcoPropertiesByPropertyCollection[pc]}
              />
            )}
            <PropertiesContainer>
              <RcoChooserList
                properties={rcoPropertiesByPropertyCollection[pc]}
                columns={columns}
              />
            </PropertiesContainer>
          </Fragment>
        </StyledCollapse>
      </StyledCard>
    </ErrorBoundary>
  )
}

export default withResizeDetector(RCO)
