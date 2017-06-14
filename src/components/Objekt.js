// @flow
import React from 'react'
import { toJS } from 'mobx'
import { observer, inject } from 'mobx-react'
import compose from 'recompose/compose'

const enhance = compose(inject('store'), observer)

const Objekt = ({ store }: { store: Object }) => {
  console.log('activeTaxonomyObject:', toJS(store.activeTaxonomyObject))
  const to = JSON.stringify(toJS(store.activeTaxonomyObject), null, 2)
  return <div><div>Objekt</div><div>{to}</div></div>
}

export default enhance(Objekt)
