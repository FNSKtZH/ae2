// @flow
import React from 'react'
import { observer, inject } from 'mobx-react'
import compose from 'recompose/compose'

const enhance = compose(inject('store'), observer)

const Objekt = ({ store, data }: { store: Object, data: Object }) => {
  console.log('data:', data)
  return <div>Objekt</div>
}

// export default enhance(Objekt)
export default enhance(Objekt)
