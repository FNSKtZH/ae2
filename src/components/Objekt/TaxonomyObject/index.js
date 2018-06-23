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
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Collapse from '@material-ui/core/Collapse'
import IconButton from '@material-ui/core/IconButton'
import Icon from '@material-ui/core/Icon'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import EditIcon from '@material-ui/icons/Edit'
import ViewIcon from '@material-ui/icons/Visibility'
import SynonymIcon from '@material-ui/icons/Forward'
import InfoOutlineIcon from '@material-ui/icons/InfoOutline'
import InfoIcon from '@material-ui/icons/Info'
import compose from 'recompose/compose'
import withState from 'recompose/withState'
import { withApollo } from 'react-apollo'
import get from 'lodash/get'
import styled from 'styled-components'
import app from 'ampersand-app'

import PropertyReadOnly from '../../shared/PropertyReadOnly'
import PropertyReadOnlyStacked from '../../shared/PropertyReadOnlyStacked'
import TaxonomyDescription from '../../shared/TaxonomyDescription'
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
  margin: 0;
  background-color: #fff3e0 !important;
`
const StyledCardActions = styled(CardActions)`
  justify-content: space-between;
  cursor: pointer;
  height: auto !important;
  background-color: #ffcc80 !important;
`
const CardActionsButtons = styled.div`
  display: flex;
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
  word-break: break-word;
`
const StyledCardContent = styled(CardContent)`
  padding: 0 16px 0 16px !important;
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
  withState('taxExpanded', 'setTaxExpanded', false)
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
  taxExpanded,
  setTaxExpanded,
  stacked,
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
  taxExpanded: Boolean,
  setTaxExpanded: () => void,
  stacked: Boolean,
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
            <LinkMenu objekt={objekt} />
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
            <IconButton
              data-expanded={taxExpanded}
              aria-expanded={taxExpanded}
              aria-label="über diese Taxonomie"
              title={
                taxExpanded
                  ? 'Taxonomie-Beschreibung schliessen'
                  : 'Taxonomie-Beschreibung öffnen'
              }
              onClick={event => {
                event.stopPropagation()
                setTaxExpanded(!taxExpanded)
                setExpanded(true)
              }}
            >
              <Icon>
                {!taxExpanded && <InfoOutlineIcon />}
                {taxExpanded && <InfoIcon />}
              </Icon>
            </IconButton>
            <CardActionIconButton
              data-expanded={expanded}
              aria-expanded={expanded}
              aria-label="Show more"
              title={expanded ? 'Taxonomie schliessen' : 'Taxonomie öffnen'}
            >
              <Icon>
                <ExpandMoreIcon />
              </Icon>
            </CardActionIconButton>
          </CardActionsButtons>
        </StyledCardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          {taxExpanded && <TaxonomyDescription taxonomy={taxonomy} />}
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
            ) : stacked ? (
              <Fragment>
                <PropertyReadOnlyStacked
                  key={`${objekt.id}/id`}
                  value={objekt.id}
                  label="ID"
                />
                <PropertyReadOnlyStacked
                  key={`${objekt.id}/name`}
                  value={objekt.name}
                  label="Name"
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
            <Properties
              id={objekt.id}
              properties={properties}
              stacked={stacked}
            />
          </StyledCardContent>
        </Collapse>
      </StyledCard>
    </ErrorBoundary>
  )
}

export default enhance(TaxonomyObject)
