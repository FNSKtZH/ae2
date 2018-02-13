// @flow
import React from 'react'
import { Card, CardHeader, CardText } from 'material-ui/Card'
import styled from 'styled-components'
import { withApollo } from 'react-apollo'
import get from 'lodash/get'
import groupBy from 'lodash/groupBy'
import compose from 'recompose/compose'

import RCO from './RCO'
import propsByTaxData from '../../propsByTaxData'
import exportTaxonomiesData from '../../../exportTaxonomiesData'
import data from '../data'
import ErrorBoundary from '../../../../shared/ErrorBoundary'

const StyledCard = styled(Card)`
  margin: 10px 0;
  padding: 0;
  > div {
    padding-bottom: 0 !important;
  }
`
const StyledCardHeader = styled(CardHeader)`
  background-color: #ffcc80;
`
const StyledCardText = styled(CardText)`
  padding: 0 !important;
`
const Count = styled.span`
  font-size: x-small;
  padding-left: 5px;
`

const cardTitleStyle = { fontWeight: 'bold' }

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
      <StyledCard expanded={rcoExpanded} onExpandChange={onToggleRco}>
        <StyledCardHeader
          title={
            <div>
              Beziehungssammlungen{rCCount > 0 && (
                <Count>{`(${rCCount} Sammlungen, ${
                  Object.keys(rcoPropertiesFields).length
                } ${
                  Object.keys(rcoPropertiesFields).length === 1
                    ? 'Feld'
                    : 'Felder'
                })`}</Count>
              )}
            </div>
          }
          actAsExpander={true}
          showExpandableButton={true}
          titleStyle={cardTitleStyle}
        />
        <StyledCardText expandable={true}>
          {Object.keys(rcoPropertiesByPropertyCollection).map(pc => (
            <RCO key={pc} pc={pc} />
          ))}
        </StyledCardText>
      </StyledCard>
    </ErrorBoundary>
  )
}

export default enhance(RCOs)
