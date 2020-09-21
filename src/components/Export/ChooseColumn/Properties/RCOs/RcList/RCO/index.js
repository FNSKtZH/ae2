import React, { useState, useCallback, useContext } from 'react'
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
import { observer } from 'mobx-react-lite'
import { withResizeDetector } from 'react-resize-detector'

import AllChooser from './AllChooser'
import Properties from './Properties'
import mobxStoreContext from '../../../../../../../mobxStoreContext'
import ErrorBoundary from '../../../../../../shared/ErrorBoundary'
import getConstants from '../../../../../../../modules/constants'
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
  query propsByTaxDataQuery(
    $queryExportTaxonomies: Boolean!
    $exportTaxonomies: [String]
  ) {
    rcoPropertiesByTaxonomiesFunction(taxonomyNames: $exportTaxonomies)
      @include(if: $queryExportTaxonomies) {
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
const rcoCountByTaxonomyRelationTypeQuery = gql`
  query dataQuery {
    rcoCountByTaxonomyRelationTypeFunction {
      nodes {
        propertyCollectionName
        relationType
        count
      }
    }
  }
`

const RCO = ({ pc, width = 500 }) => {
  const mobxStore = useContext(mobxStoreContext)
  const exportTaxonomies = mobxStore.export.taxonomies.toJSON()

  const { data: propsByTaxData, error: propsByTaxError } = useQuery(
    propsByTaxQuery,
    {
      variables: {
        exportTaxonomies,
        queryExportTaxonomies: exportTaxonomies.length > 0,
      },
    },
  )
  const { data, error } = useQuery(rcoCountByTaxonomyRelationTypeQuery)

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
  // need to add BeziehungsPartnerId and BeziehungsPartnerName
  const rcoCountByTaxonomyRelationType = get(
    data,
    'rcoCountByTaxonomyRelationTypeFunction.nodes',
    [],
  )
  // in every key of rcoPropertiesByPropertyCollection
  // add id and name of Beziehungspartner

  Object.values(rcoPropertiesByPropertyCollection).forEach((rpc) => {
    const myRpc = rpc[0] || {}
    let rco = rcoCountByTaxonomyRelationType.find(
      (r) =>
        r.propertyCollectionName === myRpc.propertyCollectionName &&
        r.relationType === myRpc.relationType,
    )
    if (!rco) {
      rco = rcoCountByTaxonomyRelationType.find(
        (r) =>
          `${r.propertyCollectionName}: ${r.relationType}` ===
            myRpc.propertyCollectionName &&
          r.relationType === myRpc.relationType,
      )
    }
    if (!rco) rco = {}
    rpc.push({
      count: rco.count,
      jsontype: 'String',
      propertyCollectionName: myRpc.propertyCollectionName,
      propertyName: 'Beziehungspartner_id',
      relationType: myRpc.relationType,
    })
    rpc.push({
      count: rco.count,
      jsontype: 'String',
      propertyCollectionName: myRpc.propertyCollectionName,
      propertyName: 'Beziehungspartner_Name',
      relationType: myRpc.relationType,
    })
  })

  const onClickActions = useCallback(() => setExpanded(!expanded), [expanded])

  const columns = Math.floor(width / constants.export.properties.columnWidth)

  if (propsByTaxError) return `Error fetching data: ${propsByTaxError.message}`
  if (error) return `Error fetching data: ${error.message}`

  return (
    <ErrorBoundary>
      <StyledCard>
        <StyledCardActions disableSpacing onClick={onClickActions}>
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
          <>
            {rcoPropertiesByPropertyCollection[pc].length > 1 && (
              <AllChooser properties={rcoPropertiesByPropertyCollection[pc]} />
            )}
            <PropertiesContainer>
              <Properties
                properties={rcoPropertiesByPropertyCollection[pc]}
                columns={columns}
              />
            </PropertiesContainer>
          </>
        </StyledCollapse>
      </StyledCard>
    </ErrorBoundary>
  )
}

export default withResizeDetector(observer(RCO))
