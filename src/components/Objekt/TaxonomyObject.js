// @flow
import React from 'react'
import { /*observer,*/ inject } from 'mobx-react'
import compose from 'recompose/compose'
import { Card, CardHeader, CardText } from 'material-ui/Card'
import FontIcon from 'material-ui/FontIcon'
import get from 'lodash/get'
import sortBy from 'lodash/sortBy'
import styled from 'styled-components'

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

const SynonymContainer = styled.div`
  display: flex;
  justify-content: space-between;
`
const SynonymText = styled.div``
const SynonymLink = styled.a` margin-left: 5px;`
const SynomymLinkIcon = styled(FontIcon)`
  font-size: 17px !important;
  :hover {
    font-weight: 700;
  }
`

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
    // NOPE. This will return data for active node
    // Need to use own query to get needed data, then open new window
    // so use button or icon button instead?
    linkUrl = getUrlFromTOId(taxonomyObject.id)
    linkText = taxonomy.category === 'Lebensräume' ? 'Lebensraum' : 'Art'
    linkText = `${linkText} in neuem Tab öffnen`
  }
  let title = taxName
  if (showLink) {
    title = (
      <SynonymContainer>
        <SynonymText>
          {taxName}
        </SynonymText>
        <SynonymLink
          href={linkUrl}
          target="_blank"
          rel="noopener noreferrer"
          title={linkText}
        >
          <SynomymLinkIcon id="linkToSynonym" className="material-icons">
            open_in_new
          </SynomymLinkIcon>
        </SynonymLink>
      </SynonymContainer>
    )
  }

  return (
    <Card style={tOCardStyle}>
      <CardHeader
        title={title}
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
