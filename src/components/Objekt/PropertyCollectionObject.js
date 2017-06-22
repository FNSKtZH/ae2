// @flow
import React from 'react'
import { Card, CardHeader, CardText } from 'material-ui/Card'
import get from 'lodash/get'
import sortBy from 'lodash/sortBy'

import PropertyReadOnly from './PropertyReadOnly'
import PropertyCollection from './PropertyCollection'

const pCOCardStyle = { margin: '10px 0' }
const taxCardStyle = {
  backgroundColor: '#FFE0B2',
}
const pCOTitleStyle = { fontWeight: 'bold' }
const pCTitleStyle = { fontWeight: 'normal' }
const pCOCardHeaderStyle = { backgroundColor: '#FFCC80' }
const pCCardHeaderStyle = {
  backgroundColor: '#FFE0B2',
  borderBottom: '1px solid rgba(0,0,0,0.06)',
}
const pCCardTextStyle = { backgroundColor: '#FFE0B2', padding: '5px 16px' }
const pCOCardTextStyle = { padding: '5px 16px' }

const PropertyCollectionObject = ({ pCO }: { pCO: Object }) => {
  const pC = get(pCO, 'propertyCollectionByPropertyCollectionId', {})
  const pCName = get(pC, 'name', '(Name fehlt)')
  const properties = JSON.parse(pCO.properties)
  let propertiesArray = Object.entries(properties)
  propertiesArray = propertiesArray.filter(
    o => o[1] || o[1] === 0 || o[1] === false
  )
  propertiesArray = sortBy(propertiesArray, e => e[0])

  return (
    <Card style={pCOCardStyle}>
      <CardHeader
        title={pCName}
        actAsExpander={true}
        showExpandableButton={true}
        titleStyle={pCOTitleStyle}
        style={pCOCardHeaderStyle}
      />
      <Card expandable={true} style={taxCardStyle}>
        <CardHeader
          title={get(pC, 'description', '')}
          actAsExpander={true}
          showExpandableButton={true}
          titleStyle={pCTitleStyle}
          style={pCCardHeaderStyle}
        />
        <CardText expandable={true} style={pCCardTextStyle}>
          <PropertyCollection pC={pC} />
        </CardText>
      </Card>
      <CardText expandable={true} style={pCOCardTextStyle}>
        {propertiesArray.map(([key, value]) =>
          <PropertyReadOnly key={key} value={value} label={key} />
        )}
      </CardText>
    </Card>
  )
}

export default PropertyCollectionObject
