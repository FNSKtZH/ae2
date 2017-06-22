// @flow
import React from 'react'
import { Card, CardHeader, CardText } from 'material-ui/Card'
import get from 'lodash/get'

import RelationCollection from './RelationCollection'
import Relation from './Relation'

const rCOCardStyle = { margin: '10px 0' }
const taxCardStyle = {
  backgroundColor: '#FFE0B2',
}
const rCOTitleStyle = { fontWeight: 'bold' }
const rCTitleStyle = { fontWeight: 'normal' }
const rCOCardHeaderStyle = { backgroundColor: '#FFCC80' }
const rCCardHeaderStyle = {
  backgroundColor: '#FFE0B2',
  borderBottom: '1px solid rgba(0,0,0,0.06)',
}
const rCCardTextStyle = { backgroundColor: '#FFE0B2', padding: '5px 16px' }
const rCOCardTextStyle = { padding: '5px 16px' }

const RelationCollectionObject = ({ rCO }: { rCO: Object }) => {
  const rC = get(rCO, 'relationCollectionByRelationCollectionId', {})
  const rCName = get(rC, 'name', '(Name fehlt)')
  const relations = get(
    rCO,
    'relationsByObjectIdAndRelationCollectionId.nodes',
    []
  )

  return (
    <Card style={rCOCardStyle}>
      <CardHeader
        title={rCName}
        actAsExpander={true}
        showExpandableButton={true}
        titleStyle={rCOTitleStyle}
        style={rCOCardHeaderStyle}
      />
      <Card expandable={true} style={taxCardStyle}>
        <CardHeader
          title={get(rC, 'description', '')}
          actAsExpander={true}
          showExpandableButton={true}
          titleStyle={rCTitleStyle}
          style={rCCardHeaderStyle}
        />
        <CardText expandable={true} style={rCCardTextStyle}>
          <RelationCollection rC={rC} />
        </CardText>
      </Card>
      <CardText expandable={true} style={rCOCardTextStyle}>
        {relations.map((relation, index) =>
          <Relation
            key={relation.id}
            relation={relation}
            intermediateRelation={index < relations.length - 1}
          />
        )}
      </CardText>
    </Card>
  )
}

export default RelationCollectionObject
