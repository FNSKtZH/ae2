// @flow
import React from 'react'
import { Card, CardHeader, CardText } from 'material-ui/Card'
import get from 'lodash/get'

import PropertyCollection from '../ObjectPropertyCollection'
import ErrorBoundary from '../../shared/ErrorBoundary'

const taxCardStyle = {
  backgroundColor: '#FFE0B2',
}
const pCTitleStyle = { fontWeight: 'normal' }
const pCCardHeaderStyle = {
  backgroundColor: '#FFE0B2',
  borderBottom: '1px solid rgba(0,0,0,0.06)',
}
const pCCardTextStyle = { backgroundColor: '#FFE0B2', padding: '5px 16px' }

const PC = ({ pCO }: { pCO: Object }) => {
  const pC = get(pCO, 'propertyCollectionByPropertyCollectionId', {})

  return (
    <ErrorBoundary>
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
    </ErrorBoundary>
  )
}

export default PC
