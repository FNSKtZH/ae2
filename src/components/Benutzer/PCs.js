// @flow
import React from 'react'
import styled from 'styled-components'

import appBaseUrl from '../../modules/appBaseUrl'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`
const List = styled.div`
  column-width: 400px;
  margin-bottom: 10px;
  ul {
    -webkit-margin-before: 0px;
  }
`
const StyledA = styled.a`
  color: inherit;
  font-weight: 100;
  cursor: pointer;
  text-decoration-color: rgba(0, 0, 0, 0.3);
  text-decoration-style: dotted;
`

const PCs = ({ pcs }: { pcs: Array<Object> }) => {
  return (
    <Container>
      <List>
        <ul>
          {pcs.map(u => {
            const link = `${appBaseUrl}/Eigenschaften-Sammlungen/${encodeURIComponent(
              u.id
            )}`
            return (
              <li key={u.name}>
                <StyledA href={link} target="_blank">
                  {u.name}
                </StyledA>
              </li>
            )
          })}
        </ul>
      </List>
    </Container>
  )
}

export default PCs
