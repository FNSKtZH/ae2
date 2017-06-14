// @flow
import React from 'react'
import { observer, inject } from 'mobx-react'
import compose from 'recompose/compose'
import styled from 'styled-components'

const enhance = compose(inject('store'), observer)

const Taxonomy = ({ store, taxonomy }: { store: Object, taxonomy: Object }) => {
  console.log('Taxonomy:', taxonomy)
  return <div>{taxonomy.name}</div>
}

export default enhance(Taxonomy)
