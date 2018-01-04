// @flow
import React from 'react'
import get from 'lodash/get'
import sortBy from 'lodash/sortBy'
import styled from 'styled-components'
import compose from 'recompose/compose'

import appBaseUrl from '../../../modules/appBaseUrl'
import activeNodeArrayData from '../../../modules/activeNodeArrayData'
import tcsData from './tcsData'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`
const Label = styled.div`
  color: rgba(0, 0, 0, 0.3);
  margin-bottom: 10px;
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
  fontweight: 100;
  cursor: pointer;
  text-decoration-color: rgba(0, 0, 0, 0.3);
  text-decoration-style: dotted;
`

const enhance = compose(activeNodeArrayData, tcsData)

const TCs = ({ tcsData }: { tcsData: Object }) => {
  console.log('TCs: tcsData:', tcsData)
  const tcs = sortBy(
    get(tcsData, 'organizationByName.taxonomiesByOrganizationId.nodes', []),
    'name'
  )
  console.log('TCs: tcs:', tcs)

  return (
    <Container>
      <Label>Importierte Taxonomien:</Label>
      <List>
        <ul>
          {tcs.map(u => {
            // NOPE: need to fetch category as by User
            const link = `${appBaseUrl}Eigenschaften-Sammlungen/${u.id}`
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

export default enhance(TCs)
