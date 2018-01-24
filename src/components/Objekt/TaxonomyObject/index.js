// @flow
/**
 * TODO editing
 * if user is logged in and is orgAdmin or orgTaxonomyWriter
 * and object is not synonym
 * show editing symbol
 * if user klicks it, toggle store > editingTaxonomies
 * edit prop: see https://stackoverflow.com/a/35349699/712005
 */
import React, { Fragment } from 'react'
import Card, { CardActions, CardContent } from 'material-ui-next/Card'
import Collapse from 'material-ui-next/transitions/Collapse'
import IconButton from 'material-ui-next/IconButton'
import ExpandMoreIcon from 'material-ui-icons/ExpandMore'
import EditIcon from 'material-ui-icons/Edit'
import ViewIcon from 'material-ui-icons/Visibility'
import SynonymIcon from 'material-ui-icons/Forward'
import compose from 'recompose/compose'
import withState from 'recompose/withState'
import { withApollo } from 'react-apollo'
import get from 'lodash/get'
import styled from 'styled-components'
import app from 'ampersand-app'

import PropertyReadOnly from '../../shared/PropertyReadOnly'
import Taxonomy from '../Taxonomy'
import Property from './Property'
import Properties from './Properties'
import getUrlForObject from '../../../modules/getUrlForObject'
import ErrorBoundary from '../../shared/ErrorBoundary'
import activeNodeArrayData from '../../../modules/activeNodeArrayData'
import objectData from '../objectData'
import loginData from '../../../modules/loginData'
import organizationUserData from '../../../modules/organizationUserData'
import editingTaxonomiesData from '../../../modules/editingTaxonomiesData'
import editingTaxonomiesMutation from '../../../modules/editingTaxonomiesMutation'

const StyledCard = styled(Card)`
  margin: 10px 0;
  background-color: #fff3e0 !important;
`
const StyledCard2 = styled(Card)`
  margin: 10px 0;
  background-color: #ffe0b2 !important;
  margin-top: 0 !important;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px !important;
`
const StyledCardActions = styled(CardActions)`
  justify-content: space-between;
  cursor: pointer;
  background-color: #ffcc80 !important;
`
const CardActionsButtons = styled.div`
  display: flex;
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
const CardEditButton = styled(IconButton)`
  :hover {
    font-weight: 700;
    background-color: rgba(0, 0, 0, 0.12);
    text-decoration: none;
  }
`
const CardActionTitle = styled.div`
  padding-left: 8px;
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`
const CardActionTitle2 = styled(CardActionTitle)`
  font-weight: normal;
`
const StyledCardContent = styled(CardContent)`
  padding: 0 16px 0 0 !important;
  margin: 5px 0;
  column-width: 500px;
`
const SynonymButton = styled(IconButton)`
  :hover {
    font-weight: 700;
    background-color: rgba(0, 0, 0, 0.12);
    text-decoration: none;
  }
`

const enhance = compose(
  withApollo,
  activeNodeArrayData,
  objectData,
  loginData,
  organizationUserData,
  editingTaxonomiesData,
  withState(
    'expanded',
    'setExpanded',
    ({ showLink }) => (showLink ? false : true)
  ),
  withState('expanded2', 'setExpanded2', false)
)

const TaxonomyObject = ({
  client,
  activeNodeArrayData,
  objectData,
  loginData,
  organizationUserData,
  editingTaxonomiesData,
  showLink,
  expanded,
  setExpanded,
  expanded2,
  setExpanded2,
}: {
  client: Object,
  activeNodeArrayData: Object,
  objectData: Object,
  loginData: Object,
  organizationUserData: Object,
  editingTaxonomiesData: Object,
  showLink: Boolean,
  expanded: Boolean,
  setExpanded: () => void,
  expanded2: Boolean,
  setExpanded2: () => void,
}) => {
  const objekt = get(objectData, 'objectById')
  const login = get(loginData, 'login')
  const username = login && login.username ? login.username : null
  const organizationUsers = get(
    organizationUserData,
    'allOrganizationUsers.nodes',
    []
  )
  const editing = get(editingTaxonomiesData, 'editingTaxonomies', false)
  const userRoles = organizationUsers
    .filter(oU => username === get(oU, 'userByUserId.name', ''))
    .map(oU => oU.role)
  const userIsTaxWriter =
    userRoles.includes('orgAdmin') || userRoles.includes('orgTaxonomyWriter')
  const userMayWrite = userIsTaxWriter && !showLink
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
    linkUrl = `/${getUrlForObject(objekt).join('/')}`
    linkText = taxonomy.category === 'Lebensräume' ? 'Lebensraum' : 'Art'
    linkText = `${linkText} öffnen`
  }

  return (
    <ErrorBoundary>
      <StyledCard>
        <StyledCardActions
          disableActionSpacing
          onClick={() => setExpanded(!expanded)}
        >
          <CardActionTitle>{taxname}</CardActionTitle>
          <CardActionsButtons>
            {showLink && (
              <SynonymButton
                aria-label={linkText}
                title={linkText}
                onClick={event => {
                  event.stopPropagation()
                  app.history.push(linkUrl)
                }}
              >
                <SynonymIcon />
              </SynonymButton>
            )}
            {userMayWrite &&
              editing &&
              expanded && (
                <CardEditButton
                  aria-label="Daten anzeigen"
                  title="Daten anzeigen"
                  onClick={event => {
                    event.stopPropagation()
                    client.mutate({
                      mutation: editingTaxonomiesMutation,
                      variables: { value: false },
                    })
                  }}
                >
                  <ViewIcon />
                </CardEditButton>
              )}
            {userMayWrite &&
              !editing &&
              expanded && (
                <CardEditButton
                  aria-label="Daten bearbeiten"
                  title="Daten bearbeiten"
                  onClick={event => {
                    event.stopPropagation()
                    client.mutate({
                      mutation: editingTaxonomiesMutation,
                      variables: { value: true },
                    })
                  }}
                >
                  <EditIcon />
                </CardEditButton>
              )}
            <CardActionIconButton
              data-expanded={expanded}
              aria-expanded={expanded}
              aria-label="Show more"
            >
              <ExpandMoreIcon />
            </CardActionIconButton>
          </CardActionsButtons>
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
            {editing ? (
              <Fragment>
                <Property value={objekt.name} label="Name" />
                <Property value={objekt.category} label="Gruppe" />
              </Fragment>
            ) : (
              <Fragment>
                <PropertyReadOnly value={objekt.name} label="Name" />
                <PropertyReadOnly value={objekt.category} label="Gruppe" />
              </Fragment>
            )}
            <Properties
              id={objekt.id}
              properties={properties}
              objectData={objectData}
            />
          </StyledCardContent>
        </Collapse>
      </StyledCard>
    </ErrorBoundary>
  )
}

export default enhance(TaxonomyObject)
