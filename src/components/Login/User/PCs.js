// @flow
import React from 'react'
import get from 'lodash/get'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
`
const Label = styled.div`
  color: rgba(0, 0, 0, 0.3);
  margin-bottom: 10px;
  margin-top: 10px;
`
const List = styled.div`
  column-width: 400px;
  margin-bottom: 10px;
  ul {
    -webkit-margin-before: 0px;
  }
`

const PCs = ({ pcs }: { pcs: Array<Object> }) => (
  <Container>
    <Label>Importierte Eigenschaftensammlungen:</Label>
    <List>
      <ul>
        {pcs.map(u => {
          const name = get(u, 'name', '')
          return <li key={name}>{name}</li>
        })}
      </ul>
    </List>
  </Container>
)

export default PCs
