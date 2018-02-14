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
import Card, { CardActions, CardContent } from 'material-ui/Card'
import Collapse from 'material-ui/transitions/Collapse'
import IconButton from 'material-ui/IconButton'
import Icon from 'material-ui/Icon'
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
import LinkMenu from './LinkMenu'
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
const StyledButton = styled(IconButton)`
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
  loginData,
  organizationUserData,
  editingTaxonomiesData,
  objekt,
  showLink,
  expanded,
  setExpanded,
  expanded2,
  setExpanded2,
}: {
  client: Object,
  activeNodeArrayData: Object,
  loginData: Object,
  organizationUserData: Object,
  editingTaxonomiesData: Object,
  objekt: Object,
  showLink: Boolean,
  expanded: Boolean,
  setExpanded: () => void,
  expanded2: Boolean,
  setExpanded2: () => void,
}) => {
  const username = get(loginData, 'login.username', null)
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
    linkText = taxonomy.type
      .replace('ART', 'Art')
      .replace('LEBENSRAUM', 'Lebensraum')
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
            <LinkMenu taxonomy={taxonomy} />
            {showLink && (
              <StyledButton
                aria-label={linkText}
                title={linkText}
                onClick={event => {
                  event.stopPropagation()
                  app.history.push(linkUrl)
                }}
              >
                <SynonymIcon />
              </StyledButton>
            )}
            {userMayWrite &&
              editing &&
              expanded && (
                <StyledButton
                  aria-label="Daten anzeigen"
                  title="Daten anzeigen"
                  onClick={event => {
                    event.stopPropagation()
                    client.mutate({
                      mutation: editingTaxonomiesMutation,
                      variables: { value: false },
                      optimisticResponse: {
                        setEditingTaxonomies: {
                          editingTaxonomies: false,
                          __typename: 'EditingTaxonomies',
                        },
                        __typename: 'Mutation',
                      },
                    })
                  }}
                >
                  <Icon>
                    <ViewIcon />
                  </Icon>
                </StyledButton>
              )}
            {userMayWrite &&
              !editing &&
              expanded && (
                <StyledButton
                  aria-label="Daten bearbeiten"
                  title="Daten bearbeiten"
                  onClick={event => {
                    event.stopPropagation()
                    client.mutate({
                      mutation: editingTaxonomiesMutation,
                      variables: { value: true },
                      optimisticResponse: {
                        setEditingTaxonomies: {
                          editingTaxonomies: true,
                          __typename: 'EditingTaxonomies',
                        },
                        __typename: 'Mutation',
                      },
                    })
                  }}
                >
                  <Icon>
                    <EditIcon />
                  </Icon>
                </StyledButton>
              )}
            <CardActionIconButton
              data-expanded={expanded}
              aria-expanded={expanded}
              aria-label="Show more"
            >
              <Icon>
                <ExpandMoreIcon />
              </Icon>
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
                <Icon>
                  <ExpandMoreIcon />
                </Icon>
              </CardActionIconButton>
            </StyledCardActions2>
            <Collapse in={expanded2} timeout="auto" unmountOnExit>
              <StyledCardContent>
                <Taxonomy taxonomy={taxonomy} />
              </StyledCardContent>
            </Collapse>
          </StyledCard2>
          <StyledCardContent>
            {editing ? (
              <Fragment>
                <Property
                  key={`${objekt.id}/id`}
                  label="ID"
                  field="id"
                  objekt={objekt}
                  disabled={true}
                />
                <Property
                  key={`${objekt.id}/name`}
                  label="Name"
                  field="name"
                  objekt={objekt}
                />
              </Fragment>
            ) : (
              <Fragment>
                <PropertyReadOnly
                  key={`${objekt.id}/id`}
                  value={objekt.id}
                  label="ID"
                />
                <PropertyReadOnly
                  key={`${objekt.id}/name`}
                  value={objekt.name}
                  label="Name"
                />
              </Fragment>
            )}
            <Properties id={objekt.id} properties={properties} />
          </StyledCardContent>
        </Collapse>
      </StyledCard>
    </ErrorBoundary>
  )
}

export default enhance(TaxonomyObject)
