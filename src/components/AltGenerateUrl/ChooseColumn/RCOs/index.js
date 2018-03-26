// @flow
import React from 'react'
import Card, { CardActions } from 'material-ui/Card'
import Collapse from 'material-ui/transitions/Collapse'
import IconButton from 'material-ui/IconButton'
import Icon from 'material-ui/Icon'
import ExpandMoreIcon from 'material-ui-icons/ExpandMore'
import styled from 'styled-components'
import { withApollo } from 'react-apollo'
import get from 'lodash/get'
import groupBy from 'lodash/groupBy'
import compose from 'recompose/compose'

import RCO from './RCO'
import ChooseNrOfRows from './ChooseNrOfRows'
import propsByTaxData from '../propsByTaxData'
import exportTaxonomiesData from '../../exportTaxonomiesData'
import data from '../data'
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

const enhance = compose(withApollo, exportTaxonomiesData, data, propsByTaxData)

const RCOs = ({
  propsByTaxData,
  data,
  rcoExpanded,
  onToggleRco,
}: {
  propsByTaxData: Object,
  data: Object,
  rcoExpanded: Boolean,
  onToggleRco: () => {},
}) => {
  const rcoProperties = get(
    propsByTaxData,
    'rcoPropertiesByTaxonomiesFunction.nodes',
    []
  )

  const rcoPropertiesByPropertyCollection = groupBy(rcoProperties, x => {
    if (x.propertyCollectionName.includes(x.relationType)) {
      return x.propertyCollectionName
    }
    return `${x.propertyCollectionName}: ${x.relationType}`
  })
  // TODO: need to add BeziehungsPartnerId and BeziehungsPartnerName
  const rcoCountByTaxonomyRelationType = get(
    data,
    'rcoCountByTaxonomyRelationTypeFunction.nodes',
    []
  )
  // TODO:
  // in every key of rcoPropertiesByPropertyCollection
  // add id and name of Beziehungspartner

  Object.values(rcoPropertiesByPropertyCollection).forEach(rpc => {
    const myRpc = rpc[0] || {}
    let rco = rcoCountByTaxonomyRelationType.find(
      r =>
        r.propertyCollectionName === myRpc.propertyCollectionName &&
        r.relationType === myRpc.relationType
    )
    if (!rco) {
      rco = rcoCountByTaxonomyRelationType.find(
        r =>
          `${r.propertyCollectionName}: ${r.relationType}` ===
            myRpc.propertyCollectionName &&
          r.relationType === myRpc.relationType
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
  const rCCount = Object.keys(rcoPropertiesByPropertyCollection).length

  return (
    <ErrorBoundary>
      <StyledCard>
        <StyledCardActions disableActionSpacing onClick={onToggleRco}>
          <CardActionTitle>
            Beziehungssammlungen{rCCount > 0 && (
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
          {Object.keys(rcoPropertiesByPropertyCollection).map(pc => (
            <RCO key={pc} pc={pc} />
          ))}
        </Collapse>
      </StyledCard>
    </ErrorBoundary>
  )
}

export default enhance(RCOs)
