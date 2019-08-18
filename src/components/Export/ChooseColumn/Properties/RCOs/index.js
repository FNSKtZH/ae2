import React, { useContext } from 'react'
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

import RcList from './RcList'
import ChooseNrOfRows from './ChooseNrOfRows'
import ErrorBoundary from '../../../../shared/ErrorBoundary'
import mobxStoreContext from '../../../../../mobxStoreContext'

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

const RCOs = ({ rcoExpanded, onToggleRco }) => {
  const mobxStore = useContext(mobxStoreContext)
  const exportTaxonomies = mobxStore.export.taxonomies.toJSON()

  const { data, error: dataError } = useQuery(
    rcoCountByTaxonomyRelationTypeQuery,
  )
  const { data: propsByTaxData, error: propsByTaxDataError } = useQuery(
    propsByTaxQuery,
    {
      variables: {
        exportTaxonomies,
        queryExportTaxonomies: exportTaxonomies.length > 0,
      },
    },
  )

  const rcoProperties = get(
    propsByTaxData,
    'rcoPropertiesByTaxonomiesFunction.nodes',
    [],
  )

  const rcoPropertiesByPropertyCollection = groupBy(rcoProperties, x => {
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

  Object.values(rcoPropertiesByPropertyCollection).forEach(rpc => {
    const myRpc = rpc[0] || {}
    let rco = rcoCountByTaxonomyRelationType.find(
      r =>
        r.propertyCollectionName === myRpc.propertyCollectionName &&
        r.relationType === myRpc.relationType,
    )
    if (!rco) {
      rco = rcoCountByTaxonomyRelationType.find(
        r =>
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
  const rcoPropertiesFields = groupBy(rcoProperties, 'propertyName')
  const rcNames = Object.keys(rcoPropertiesByPropertyCollection)
  const rCCount = rcNames.length

  if (propsByTaxDataError)
    return `Error fetching data: ${propsByTaxDataError.message}`
  if (dataError) return `Error fetching data: ${dataError.message}`

  return (
    <ErrorBoundary>
      <Container>
        <StyledCard>
          <StyledCardActions disableSpacing onClick={onToggleRco}>
            <CardActionTitle>
              Beziehungssammlungen
              {rCCount > 0 && (
                <Count>{`(${rCCount} Sammlungen, ${
                  Object.keys(rcoPropertiesFields).length
                } ${
                  Object.keys(rcoPropertiesFields).length === 1
                    ? 'Feld'
                    : 'Felder'
                })`}</Count>
              )}
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
            <ChooseNrOfRows />
            <RcList rcNames={rcNames} />
          </Collapse>
        </StyledCard>
      </Container>
    </ErrorBoundary>
  )
}

export default observer(RCOs)
