// @flow
import React from 'react'
import { Card, CardHeader, CardText } from 'material-ui/Card'
import FontIcon from 'material-ui/FontIcon'
import get from 'lodash/get'
import sortBy from 'lodash/sortBy'
import styled from 'styled-components'

import PropertyReadOnly from '../shared/PropertyReadOnly'
import Taxonomy from './Taxonomy'
import getUrlForObject from '../../modules/getUrlForObject'
import appBaseUrl from '../../modules/appBaseUrl'
import ErrorBoundary from '../shared/ErrorBoundary'

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
const taxCardTextStyle = {
  backgroundColor: '#FFE0B2',
  padding: '10px 16px 5px 16px',
}
const tOCardTextStyle = { padding: '10px 16px 5px 16px', columnWidth: '500px' }

const SynonymContainer = styled.div`
  display: flex;
  justify-content: space-between;
`
const SynonymText = styled.div``
const SynonymLink = styled.a`
  margin-left: 5px;
`
const SynomymLinkIcon = styled(FontIcon)`
  font-size: 17px !important;
  :hover {
    font-weight: 700;
  }
`
const PropertiesTitleContainer = styled.div`
  display: flex;
  padding-top: 10px;
`
const PropertiesTitleLabel = styled.p`
  flex-basis: 250px;
  text-align: right;
  padding-right: 5px;
  margin: 3px 0;
  padding: 2px;
  color: grey;
`
const PropertiesTitleValue = styled.p`
  margin: 3px 0;
  padding: 2px;
  width: 100%;
`

const TaxonomyObject = ({
  objekt,
  showLink,
}: {
  objekt: Object,
  showLink: Boolean,
}) => {
  const taxonomy = get(objekt, 'taxonomyByTaxonomyId', {})
  let taxname = get(taxonomy, 'name', '(Name fehlt)')
  // never pass null to object.entries!!!
  const properties = JSON.parse(objekt.properties) || {}
  if (properties['Artname vollständig']) {
    taxname = `${taxname}: ${properties['Artname vollständig']}`
  }
  let linkUrl
  let linkText
  if (showLink) {
    // NOPE. This will return data for active node
    // Need to use own query to get needed data, then open new window
    // so use button or icon button instead?
    linkUrl = getUrlForObject(objekt).join('/')
    linkText = taxonomy.category === 'Lebensräume' ? 'Lebensraum' : 'Art'
    linkText = `${linkText} in neuem Tab öffnen`
  }
  let title = taxname
  if (showLink) {
    title = (
      <SynonymContainer>
        <SynonymText>{taxname}</SynonymText>
        <SynonymLink
          href={linkUrl}
          target="_blank"
          rel="noopener noreferrer"
          title={linkText}
          onClick={event =>
            window.open(`${appBaseUrl}/${linkUrl}`, 'target="_blank"')
          }
        >
          <SynomymLinkIcon id="linkToSynonym" className="material-icons">
            open_in_new
          </SynomymLinkIcon>
        </SynonymLink>
      </SynonymContainer>
    )
  }

  return (
    <ErrorBoundary>
      <Card style={tOCardStyle} initiallyExpanded>
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
          <PropertyReadOnly value={objekt.id} label="ID" />
          <PropertyReadOnly value={objekt.name} label="Name" />
          <PropertyReadOnly value={objekt.category} label="Gruppe" />
          {Object.entries(properties).length > 0 && (
            <PropertiesTitleContainer>
              <PropertiesTitleLabel>Eigenschaften:</PropertiesTitleLabel>
              <PropertiesTitleValue />
            </PropertiesTitleContainer>
          )}
          {sortBy(
            Object.entries(properties).filter(
              ([key, value]) => value || value === 0
            ),
            e => e[0]
          ).map(([key, value]) => (
            <PropertyReadOnly key={key} value={value} label={key} />
          ))}
        </CardText>
      </Card>
    </ErrorBoundary>
  )
}

export default TaxonomyObject
