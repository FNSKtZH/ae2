// @flow
import React from 'react'
import { /*observer,*/ inject } from 'mobx-react'
import compose from 'recompose/compose'
import { Card, CardHeader, CardText } from 'material-ui/Card'
import get from 'lodash/get'
import sortBy from 'lodash/sortBy'

import PropertyReadOnly from './PropertyReadOnly'
import Taxonomy from './Taxonomy'
import getUrlFromTOId from '../../modules/getUrlFromTOId'

const tOCardStyle = { margin: '10px 0' }
const taxCardStyle = {
  backgroundColor: '#FFE0B2',
}
const tOTitleStyle = { fontWeight: 'bold' }
const taxTitleStyle = { fontWeight: 'normal' }
const tOCardHeaderStyle = { backgroundColor: '#FFCC80' }
const taxCardHeaderStyle = {
  backgroundColor: '#FFE0B2',
  borderBottom: '1px solid rgba(0,0,0,0.06)',
}
const taxCardTextStyle = { backgroundColor: '#FFE0B2', padding: '5px 16px' }
const tOCardTextStyle = { padding: '5px 16px' }

const enhance = compose(inject('store') /*, observer*/)

const TaxonomyObject = ({
  store,
  taxonomyObject,
  showLink,
}: {
  store: Object,
  taxonomyObject: Object,
  showLink: Boolean,
}) => {
  const taxonomy = get(taxonomyObject, 'taxonomyByTaxonomyId', {})
  let taxName = get(taxonomy, 'name', '(Name fehlt)')
  // never pass null to object.entries!!!
  const properties = JSON.parse(taxonomyObject.properties) || {}
  if (properties['Artname vollständig']) {
    taxName = `${taxName}: ${properties['Artname vollständig']}`
  }
  let linkUrl
  let linkText
  if (showLink) {
    linkUrl = getUrlFromTOId(taxonomyObject.id)
    linkText = taxonomy.category === 'Lebensräume' ? 'Lebensraum' : 'Art'
    linkText = `${linkText} in neuem Tab öffnen`
  }

  return (
    <Card style={tOCardStyle}>
      <CardHeader
        title={taxName}
        actAsExpander={true}
        showExpandableButton={true}
        titleStyle={tOTitleStyle}
        style={tOCardHeaderStyle}
      />
      <Card expandable={true} style={taxCardStyle}>
        <CardHeader
          title={get(taxonomy, 'description', '')}
          actAsExpander={true}
          showExpandableButton={true}
          titleStyle={taxTitleStyle}
          style={taxCardHeaderStyle}
        />
        <CardText expandable={true} style={taxCardTextStyle}>
          <Taxonomy taxonomy={taxonomy} />
        </CardText>
      </Card>
      <CardText expandable={true} style={tOCardTextStyle}>
        {showLink &&
          <a href={linkUrl} target="_blank" rel="noopener noreferrer">
            {linkText}
          </a>}
        {sortBy(
          Object.entries(properties).filter(
            ([key, value]) => value || value === 0,
          ),
          e => e[0],
        ).map(([key, value]) =>
          <PropertyReadOnly key={key} value={value} label={key} />,
        )}
      </CardText>
    </Card>
  )
}

export default enhance(TaxonomyObject)
