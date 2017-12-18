// @flow
import React from 'react'
import compose from 'recompose/compose'
import styled from 'styled-components'
import get from 'lodash/get'

import activeNodeArrayData from '../modules/activeNodeArrayData'
import pCData from '../modules/pCData'

const enhance = compose(activeNodeArrayData, pCData)

const Container = styled.div`
  padding: 10px;
`

const PropertyCollection = ({ pCData }: { pCData: Object }) => {
  const pC = get(pCData, 'propertyCollectionById', {})
  console.log('pCData:', pCData)
  console.log('pC:', pC)

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
    </Container>
  )
}

export default enhance(PropertyCollection)
