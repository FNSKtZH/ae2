// @flow
/**
 * TODO editing
 * if user is logged in and is orgAdmin or orgTaxonomyWriter
 * and object is not synonym
 * show editing symbol
 * if user klicks it, toggle store > editingTaxonomies
 * edit prop: see https://stackoverflow.com/a/35349699/712005
 */
import React, { useState, useCallback, useContext } from 'react'
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
import InfoOutlineIcon from '@material-ui/icons/Info'
import InfoIcon from '@material-ui/icons/Info'
import get from 'lodash/get'
import styled from 'styled-components'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { observer } from 'mobx-react-lite'

import PropertyReadOnly from '../../../shared/PropertyReadOnly'
import PropertyReadOnlyStacked from '../../../shared/PropertyReadOnlyStacked'
import TaxonomyDescription from '../../../shared/TaxonomyDescription'
import Property from './Property'
import LinkMenu from './LinkMenu'
import Properties from './Properties'
import getUrlForObject from '../../../../modules/getUrlForObject'
import ErrorBoundary from '../../../shared/ErrorBoundary'
import historyContext from '../../../../historyContext'
import mobxStoreContext from '../../../../mobxStoreContext'

const Container = styled.div`
  margin: 10px;
`
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

const organizationUsersQuery = gql`
  query AllOrganizationUsersQuery {
    allOrganizationUsers {
      nodes {
        id
        nodeId
        organizationId
        userId
        role
        userByUserId {
          id
          name
        }
      }
    }
  }
`

const TaxonomyObject = ({
  objekt,
  showLink,
  stacked,
}: {
  objekt: Object,
  showLink: Boolean,
  stacked: Boolean,
}) => {
  const history = useContext(historyContext)
  const mobxStore = useContext(mobxStoreContext)
  const { editingTaxonomies, setEditingTaxonomies, login } = mobxStore

  const {
    data: organizationUsersData,
    loading: organizationUsersLoading,
    error: organizationUsersError,
  } = useQuery(organizationUsersQuery)

  const [expanded, setExpanded] = useState(showLink ? false : true)
  const [taxExpanded, setTaxExpanded] = useState(false)

  const { username } = login
  const organizationUsers = get(
    organizationUsersData,
    'allOrganizationUsers.nodes',
    [],
  )
  const editing = editingTaxonomies
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

  const onClickActions = useCallback(() => setExpanded(!expanded), [expanded])
  const onClickLink = useCallback(
    e => {
      e.stopPropagation()
      history.push(linkUrl)
    },
    [history, linkUrl],
  )
  const onClickStopEditing = useCallback(
    e => {
      e.stopPropagation()
      setEditingTaxonomies(false)
    },
    [setEditingTaxonomies],
  )
  const onClickStartEditing = useCallback(
    e => {
      e.stopPropagation()
      setEditingTaxonomies(true)
    },
    [setEditingTaxonomies],
  )
  const onClickToggleTaxDescription = useCallback(
    e => {
      e.stopPropagation()
      setTaxExpanded(!taxExpanded)
      setExpanded(true)
    },
    [taxExpanded],
  )

  if (organizationUsersLoading) {
    return <Container>Lade Daten...</Container>
  }
  if (organizationUsersError) {
    return <Container>{`Fehler: ${organizationUsersError.message}`}</Container>
  }

  return (
    <ErrorBoundary>
      <StyledCard>
        <StyledCardActions disableSpacing onClick={onClickActions}>
          <CardActionTitle>{taxname}</CardActionTitle>
          <CardActionsButtons>
            <LinkMenu objekt={objekt} />
            {showLink && (
              <StyledButton
                aria-label={linkText}
                title={linkText}
                onClick={onClickLink}
              >
                <SynonymIcon />
              </StyledButton>
            )}
            {userMayWrite && editing && expanded && (
              <StyledButton
                aria-label="Daten anzeigen"
                title="Daten anzeigen"
                onClick={onClickStopEditing}
              >
                <Icon>
                  <ViewIcon />
                </Icon>
              </StyledButton>
            )}
            {userMayWrite && !editing && expanded && (
              <StyledButton
                aria-label="Daten bearbeiten"
                title="Daten bearbeiten"
                onClick={onClickStartEditing}
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
              onClick={onClickToggleTaxDescription}
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
              <>
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
              </>
            ) : stacked ? (
              <>
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
              </>
            ) : (
              <>
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
              </>
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

export default observer(TaxonomyObject)
