// @flow
import React from 'react'
import { observer, inject } from 'mobx-react'
import compose from 'recompose/compose'
import { Card, CardHeader, CardText } from 'material-ui/Card'
// import styled from 'styled-components'
import get from 'lodash/get'
import sortBy from 'lodash/sortBy'

import PropertyReadOnly from './PropertyReadOnly'
import Taxonomy from './Taxonomy'

const titleStyle = { fontWeight: 'bold' }
const cardHeaderStyle = { backgroundColor: '#FFCC80' }
const firstCardTextStyle = { backgroundColor: '#FFE0B2', padding: '5px 16px' }

const enhance = compose(inject('store'), observer)

const ObjectTaxonomy = ({
  store,
  taxonomyObject,
}: {
  store: Object,
  taxonomyObject: Object,
}) => {
  console.log('ObjectTaxonomy: taxonomyObject:', taxonomyObject)
  const taxonomy = get(taxonomyObject, 'taxonomyByTaxonomyId', {})
  const taxName = get(taxonomy, 'name', '(Name fehlt)')
  const properties = JSON.parse(taxonomyObject.properties)

  return (
    <Card>
      <CardHeader
        title={taxName}
        actAsExpander={true}
        showExpandableButton={true}
        titleStyle={titleStyle}
        style={cardHeaderStyle}
      />
      <CardText expandable={true} style={firstCardTextStyle}>
        <Taxonomy taxonomy={taxonomy} />
      </CardText>
      <CardText expandable={true}>
        {sortBy(Object.entries(properties), e => e[0]).map(([key, value]) =>
          <PropertyReadOnly key={key} value={value} label={key} />
        )}
      </CardText>
    </Card>
  )
}

export default enhance(ObjectTaxonomy)
