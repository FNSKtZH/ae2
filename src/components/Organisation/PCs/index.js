// @flow
import React from 'react'
import get from 'lodash/get'
import sortBy from 'lodash/sortBy'
import styled from 'styled-components'
import compose from 'recompose/compose'

import appBaseUrl from '../../../modules/appBaseUrl'
import activeNodeArrayData from '../../../modules/activeNodeArrayData'
import pcsData from './pcsData'
import ErrorBoundary from '../../shared/ErrorBoundary'

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

const enhance = compose(activeNodeArrayData, pcsData)

const PCs = ({ pcsData }: { pcsData: Object }) => {
  const pcs = sortBy(
    get(
      pcsData,
      'organizationByName.propertyCollectionsByOrganizationId.nodes',
      []
    ),
    'name'
  )

  return (
    <ErrorBoundary>
      <Container>
        <List>
          <ul>
            {pcs.map(u => {
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
    </ErrorBoundary>
  )
}

export default enhance(PCs)
