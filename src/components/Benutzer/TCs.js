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

const TCs = ({ tcs }: { tcs: Array<Object> }) => (
  <Container>
    <List>
      <ul>
        {tcs.map(u => {
          const elem2 = tcs.type === 'ART' ? 'Arten' : 'Lebensräume'
          const link = `${appBaseUrl}/${encodeURIComponent(elem2)}/${u.id}`
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

export default TCs
