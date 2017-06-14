// @flow
import React from 'react'
import { Card, CardHeader, CardText } from 'material-ui/Card'
// import styled from 'styled-components'
import get from 'lodash/get'
import sortBy from 'lodash/sortBy'

import PropertyReadOnly from './PropertyReadOnly'
import PropertyCollection from './PropertyCollection'

const cardStyle = { margin: '10px 0' }
const titleStyle = { fontWeight: 'bold' }
const cardHeaderStyle = { backgroundColor: '#FFCC80' }
const firstCardTextStyle = { backgroundColor: '#FFE0B2', padding: '5px 16px' }
const cardTextStyle = { padding: '5px 16px' }

const PropertyCollectionObject = ({ pCO }: { pCO: Object }) => {
  console.log('PropertyCollectionObject: pCO:', pCO)
  const pC = get(pCO, 'propertyCollectionByPropertyCollectionId', {})
  const pCName = get(pC, 'name', '(Name fehlt)')
  const properties = JSON.parse(pCO.properties)

  return (
    <Card style={cardStyle}>
      <CardHeader
        title={pCName}
        actAsExpander={true}
        showExpandableButton={true}
        titleStyle={titleStyle}
        style={cardHeaderStyle}
      />
      <CardText expandable={true} style={firstCardTextStyle}>
        <PropertyCollection pC={pC} />
      </CardText>
      <CardText expandable={true} style={cardTextStyle}>
        {sortBy(Object.entries(properties), e => e[0]).map(([key, value]) =>
          <PropertyReadOnly key={key} value={value} label={key} />
        )}
      </CardText>
    </Card>
  )
}

export default PropertyCollectionObject
