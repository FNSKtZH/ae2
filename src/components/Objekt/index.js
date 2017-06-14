// @flow
import React from 'react'
import { toJS } from 'mobx'
import { observer, inject } from 'mobx-react'
import compose from 'recompose/compose'
import styled from 'styled-components'
import get from 'lodash/get'

import Taxonomy from './Taxonomy'

const Container = styled.div`
  padding: 5px;
  height: calc(100% - 48px);
  overflow: auto !important;
`
const Title = styled.h3`

`

const enhance = compose(inject('store'), observer)

const Objekt = ({ store }: { store: Object }) => {
  const { activeTaxonomyObject } = store
  console.log('activeTaxonomyObject:', toJS(store.activeTaxonomyObject))
  const taxCount = get(
    activeTaxonomyObject,
    'taxonomyObjectsByObjectId.totalCount',
    0,
  )
  const taxonomies = get(
    activeTaxonomyObject,
    'taxonomyObjectsByObjectId.nodes',
    [],
  )
  const pcCount = get(
    activeTaxonomyObject,
    'propertyCollectionObjectsByObjectId.totalCount',
    0,
  )
  const rcCount = get(
    activeTaxonomyObject,
    'relationCollectionObjectsByObjectId.totalCount',
    0,
  )

  return (
    <Container>
      <Title>{`Taxonomien (${taxCount}):`}</Title>
      {taxonomies.map(taxonomy =>
        <Taxonomy key={taxonomy.id} taxonomy={taxonomy} />,
      )}
      <Title>{`Eigenschaften-Sammlungen (${pcCount}):`}</Title>
      <Title>{`Beziehungs-Sammlungen (${rcCount}):`}</Title>
    </Container>
  )
}

export default enhance(Objekt)
