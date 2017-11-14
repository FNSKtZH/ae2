// @flow
/**
 * This compoents job is to rerender App
 * every time one of the passed values changes
 * Result: data is requeried.
 */
import React from 'react'
import { observer, inject } from 'mobx-react'
import compose from 'recompose/compose'
import { graphql } from 'react-apollo'

import App from './App'
import activeNodeArrayQgl from '../modules/activeNodeArrayGql'

const withData = graphql(activeNodeArrayQgl)

const enhance = compose(inject('store'), withData, observer)

// pass history to re-render on url change
const AppShell = ({ store, data }: { store: Object, data: Object }) => {
  const activeNodeArray = data.activeNodeArray[0].value

  return (
    <App
      activeNodeArray={activeNodeArray}
      treeFilterText={store.treeFilter.text}
      treeFilterId={store.treeFilter.id}
    />
  )
}

export default enhance(AppShell)
