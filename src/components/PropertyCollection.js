// @flow
import React from 'react'
import compose from 'recompose/compose'
import styled from 'styled-components'
import get from 'lodash/get'
import format from 'date-fns/format'

import activeNodeArrayData from '../modules/activeNodeArrayData'
import pCData from '../modules/pCData'
import PropertyReadOnly from './PropertyReadOnly'

const enhance = compose(activeNodeArrayData, pCData)

const Container = styled.div`
  padding: 10px;
`

const PropertyCollection = ({ pCData }: { pCData: Object }) => {
  const pC = get(pCData, 'propertyCollectionById', {})
  console.log('pC:', pC)
  const org = get(pC, ('organizationByOrganizationId.name': ''))

  return (
    <Container>
      <h3>Eigenschaften-Sammlung</h3>
      <div>Idee:</div>
      <ul>
        <li>Hier erscheint die Beschreibung der Eigenschaften-Sammlung</li>
        <li>
          Im Baum eine Ebene tiefer, werden die Eigenschaften in einer Tabelle
          angezeigt. Exportierbar
        </li>
        <li>Im Baum darunter, werden allfällige Beziehungen angezeigt</li>
      </ul>
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
      <PropertyReadOnly key="org" value={org} label="Zuständige Organisation" />
    </Container>
  )
}

export default enhance(PropertyCollection)
