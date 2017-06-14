// @flow
import React from 'react'
import { observer, inject } from 'mobx-react'
import compose from 'recompose/compose'
import { Card, CardHeader, CardText } from 'material-ui/Card'
import Paper from 'material-ui/Paper'
// import styled from 'styled-components'
import get from 'lodash/get'
import sortBy from 'lodash/sortBy'

import PropertyReadOnly from './PropertyReadOnly'

const titleStyle = { fontWeight: 'bold' }
const cardHeaderStyle = { backgroundColor: '#FFCC80' }

const enhance = compose(inject('store'), observer)

const Taxonomy = ({ store, taxonomy }: { store: Object, taxonomy: Object }) => {
  console.log('Taxonomy: taxonomy:', taxonomy)
  const tax = get(taxonomy, 'taxonomyByTaxonomyId', {})
  const taxName = tax.name || '(Name fehlt)'
  const properties = JSON.parse(taxonomy.properties)

  return (
    <Card>
      <CardHeader
        title={taxName}
        actAsExpander={true}
        showExpandableButton={true}
        titleStyle={titleStyle}
        style={cardHeaderStyle}
      />
      <CardText expandable={true}>
        <Paper zDepth={1}>test</Paper>
        {sortBy(Object.entries(properties), e => e[0]).map(([key, value]) =>
          <PropertyReadOnly key={key} value={value} label={key} />
        )}
      </CardText>
    </Card>
  )
}

export default enhance(Taxonomy)
