// @flow
import React from 'react'
import compose from 'recompose/compose'
import IconButton from 'material-ui-next/IconButton'
import Icon from 'material-ui-next/Icon'
import EditIcon from 'material-ui-icons/Edit'
import ViewIcon from 'material-ui-icons/Visibility'
import styled from 'styled-components'
import get from 'lodash/get'
import format from 'date-fns/format'

import activeNodeArrayData from '../../modules/activeNodeArrayData'
import editingPCsData from '../../modules/editingPCsData'
import editingPCsMutation from '../../modules/editingPCsMutation'
import loginData from '../../modules/loginData'
import pCData from './pCData'
import PropertyReadOnly from '../shared/PropertyReadOnly'
import ErrorBoundary from '../shared/ErrorBoundary'

const enhance = compose(activeNodeArrayData, loginData, editingPCsData, pCData)

const Container = styled.div`
  padding: 10px;
`

const PropertyCollection = ({
  pCData,
  loginData,
  editingPCsData,
}: {
  pCData: Object,
  loginData: Object,
  editingPCsData: Object,
}) => {
  const { loading } = pCData
  if (loading) {
    return <Container>Lade Daten...</Container>
  }
  const pC = get(pCData, 'propertyCollectionById', {})
  const org = get(pC, 'organizationByOrganizationId.name', '')
  const editing = get(editingPCsData, 'editingPCs', false)
  const username = get(loginData, 'login.username', null)
  const allUsers = get(pCData, 'allUsers.nodes', [])
  const user = allUsers.find(u => u.name === username)
  const orgsUserIsPCWriter = get(user, 'organizationUsersByUserId.nodes', [])
    .filter(o => ['orgCollectionWriter', 'orgAdmin'].includes(o.role))
    .map(o => ({
      id: o.organizationId,
      name: get(o, 'organizationByOrganizationId.name', ''),
    }))
  const userIsPCWriter = orgsUserIsPCWriter.length > 0
  const userIsThisPCWriter =
    !!orgsUserIsPCWriter.find(o => o.id === pC.organizationId) ||
    (userIsPCWriter && !pC.organizationId)

  return (
    <ErrorBoundary>
      <Container>
        <PropertyReadOnly key="name" value={pC.name} label="Name" />
        <PropertyReadOnly
          key="description"
          value={pC.description}
          label="Beschreibung"
        />
        <PropertyReadOnly
          key="combining"
          value={
            pC.combining !== undefined
              ? pC.combining
                  .toString()
                  .replace('true', 'ja')
                  .replace('false', 'nein')
              : ''
          }
          label="zusammenfassend"
        />
        <PropertyReadOnly
          key="lastUpdated"
          value={format(new Date(pC.lastUpdated), 'DD.MM.YYYY')}
          label="Zuletzt aktualisiert"
        />
        <PropertyReadOnly
          key="links"
          value={pC.links ? pC.links.join(', ') : ''}
          label="Links"
        />
        <PropertyReadOnly
          key="org"
          value={org}
          label="Zuständige Organisation"
        />
        <PropertyReadOnly
          key="importedBy"
          value={`${user.name} (${user.email})`}
          label="Importiert von"
        />
        <PropertyReadOnly
          key="termsOfUse"
          value={pC.termsOfUse}
          label="Nutzungs-Bedingungen"
        />
      </Container>
    </ErrorBoundary>
  )
}

export default enhance(PropertyCollection)
