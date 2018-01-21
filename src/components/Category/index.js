// @flow
import React from 'react'
import compose from 'recompose/compose'
import styled from 'styled-components'
import get from 'lodash/get'

import activeNodeArrayData from '../../modules/activeNodeArrayData'
import categoryData from './categoryData'
import PropertyReadOnly from '../shared/PropertyReadOnly'
import ErrorBoundary from '../shared/ErrorBoundary'

const enhance = compose(activeNodeArrayData, categoryData)

const Container = styled.div`
  padding: 10px;
`

const Taxonomy = ({ categoryData }: { categoryData: Object }) => {
  const { loading } = categoryData
  if (loading) {
    return <Container>Lade Daten...</Container>
  }
  const category = get(categoryData, 'categoryByName', {})

  return (
    <ErrorBoundary>
      <Container>
        <PropertyReadOnly key="id" value={category.id} label="ID" />
        <PropertyReadOnly key="name" value={category.name} label="Name" />
      </Container>
    </ErrorBoundary>
  )
}

export default enhance(Taxonomy)
