// @flow
/**
 * TODO editing
 * if user is logged in and is orgAdmin or orgTaxonomyWriter
 * show editing symbol
 * if user klicks it, toggle store > editingTaxonomies
 */
import React from 'react'
import Card, { CardActions, CardContent } from 'material-ui-next/Card'
import Collapse from 'material-ui-next/transitions/Collapse'
import IconButton from 'material-ui-next/IconButton'
import ExpandMoreIcon from 'material-ui-icons/ExpandMore'
import Icon from 'material-ui-next/Icon'
import compose from 'recompose/compose'
import withState from 'recompose/withState'
import get from 'lodash/get'
import sortBy from 'lodash/sortBy'
import styled from 'styled-components'

import PropertyReadOnly from '../../shared/PropertyReadOnly'
import Taxonomy from '../Taxonomy'
import getUrlForObject from '../../../modules/getUrlForObject'
import appBaseUrl from '../../../modules/appBaseUrl'
import ErrorBoundary from '../../shared/ErrorBoundary'
import loginData from '../../../modules/loginData'
import organizationUserData from '../../../modules/organizationUserData'

const StyledCard = styled(Card)`
  margin: 10px 0;
  background-color: #fff3e0 !important;
`
const StyledCard2 = styled(Card)`
  margin: 10px 0;
  background-color: #ffe0b2 !important;
  margin-top: 0 !important;
`
const StyledCardActions = styled(CardActions)`
  justify-content: space-between;
  cursor: pointer;
  background-color: #ffcc80 !important;
`
const StyledCardActions2 = styled(CardActions)`
  justify-content: space-between;
  cursor: pointer;
  background-color: #ffe0b2 !important;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
`
const CardActionIconButton = styled(IconButton)`
  transform: ${props => (props['data-expanded'] ? 'rotate(180deg)' : 'none')};
`
const CardActionTitle = styled.div`
  padding-left: 8px;
  font-weight: bold;
`
const CardActionTitle2 = styled.div`
  padding-left: 8px;
`
const StyledCardContent = styled(CardContent)`
  padding: 0 16px 0 0 !important;
  margin: 5px 0;
  column-width: 500px;
`
const SynonymContainer = styled.div`
  display: flex;
  justify-content: space-between;
`
const SynonymText = styled.div``
const SynonymLink = styled.a`
  margin-left: 5px;
  margin-top: 2px;
`
const SynonymIcon = styled(Icon)`
  color: black;
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

const enhance = compose(
  loginData,
  organizationUserData,
  withState('expanded', 'setExpanded', true),
  withState('expanded2', 'setExpanded2', false)
)

const TaxonomyObject = ({
  loginData,
  organizationUserData,
  objekt,
  showLink,
  expanded,
  setExpanded,
  expanded2,
  setExpanded2,
}: {
  loginData: Object,
  organizationUserData: Object,
  objekt: Object,
  showLink: Boolean,
  expanded: Boolean,
  setExpanded: () => void,
  expanded2: Boolean,
  setExpanded2: () => void,
}) => {
  const login = get(loginData, 'login')
  const username = login && login.username ? login.username : null
  const organizationUsers = get(
    organizationUserData,
    'allOrganizationUsers.nodes',
    []
  )
  const userRoles = organizationUsers
    .filter(oU => username === get(oU, 'userByUserId.name', ''))
    .map(oU => oU.role)
  const userIsTaxWriter =
    userRoles.includes('orgAdmin') || userRoles.includes('orgTaxonomyWriter')
  console.log('username:', username)
  console.log('userRoles:', userRoles)
  console.log('userIsTaxWriter:', userIsTaxWriter)
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
          <SynonymIcon>open_in_new</SynonymIcon>
        </SynonymLink>
      </SynonymContainer>
    )
  }

  return (
    <ErrorBoundary>
      <StyledCard>
        <StyledCardActions
          disableActionSpacing
          onClick={() => setExpanded(!expanded)}
        >
          <CardActionTitle>{title}</CardActionTitle>
          <CardActionIconButton
            data-expanded={expanded}
            aria-expanded={expanded}
            aria-label="Show more"
          >
            <ExpandMoreIcon />
          </CardActionIconButton>
        </StyledCardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <StyledCard2>
            <StyledCardActions2
              disableActionSpacing
              onClick={() => setExpanded2(!expanded2)}
            >
              <CardActionTitle2>
                {get(taxonomy, 'description', '')}
              </CardActionTitle2>
              <CardActionIconButton
                data-expanded={expanded2}
                aria-expanded={expanded2}
                aria-label="Show more"
              >
                <ExpandMoreIcon />
              </CardActionIconButton>
            </StyledCardActions2>
            <Collapse in={expanded2} timeout="auto" unmountOnExit>
              <StyledCardContent>
                <Taxonomy taxonomy={taxonomy} />
              </StyledCardContent>
            </Collapse>
          </StyledCard2>
          <StyledCardContent>
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
          </StyledCardContent>
        </Collapse>
      </StyledCard>
    </ErrorBoundary>
  )
}

export default enhance(TaxonomyObject)
