// @flow
import React from 'react'
import get from 'lodash/get'
import styled from 'styled-components'

const Label = styled.div`
  color: rgba(0, 0, 0, 0.3);
  margin-bottom: 10px;
  margin-top: 10px;
`

const PCs = ({ pcs }: { pcs: Array<Object> }) => (
  <div>
    <Label>Importierte Eigenschaftensammlungen:</Label>
    <ul>
      {pcs.map(u => {
        const name = get(u, 'name', '')
        return <li key={name}>{name}</li>
      })}
    </ul>
  </div>
)

export default PCs
