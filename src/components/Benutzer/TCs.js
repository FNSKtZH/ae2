// @flow
import React from 'react'
import get from 'lodash/get'
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

const TCs = ({ tcs, userData }: { tcs: Array<Object>, userData: Object }) => {
  const taxByCategories = get(userData, 'categoriesOfTaxonomiesFunction.nodes')

  return (
    <Container>
      <List>
        <ul>
          {tcs.map(u => {
            const taxByCategory = taxByCategories.find(
              tbc => tbc.taxonomyId === u.id
            )
            const category = taxByCategory ? taxByCategory.categoryName : null
            const link = `${appBaseUrl}/Taxonomien/${encodeURIComponent(
              category
            )}/${u.id}`
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

export default TCs
