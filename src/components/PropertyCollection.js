// @flow
import React from 'react'
import compose from 'recompose/compose'
import styled from 'styled-components'

import activeNodeArrayData from '../modules/activeNodeArrayData'

const enhance = compose(activeNodeArrayData)

const Container = styled.div`
  padding: 10px;
`

const PropertyCollection = ({
  activeNodeArrayData,
}: {
  activeNodeArrayData: Object,
}) => {
  const { activeNodeArray } = activeNodeArrayData
  const pcId = activeNodeArray[1]

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
