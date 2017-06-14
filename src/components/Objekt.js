// @flow
import React from 'react'
import { toJS } from 'mobx'
import { observer, inject } from 'mobx-react'
import compose from 'recompose/compose'
import styled from 'styled-components'

const Container = styled.div`
  height: calc(100% - 48px);
  overflow: auto !important;
`

const enhance = compose(inject('store'), observer)

const Objekt = ({ store }: { store: Object }) => {
  console.log('activeTaxonomyObject:', toJS(store.activeTaxonomyObject))
  const to = JSON.stringify(toJS(store.activeTaxonomyObject), null, 2)
  return <Container><div>Objekt</div><div>{to}</div></Container>
}

export default enhance(Objekt)
