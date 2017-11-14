// @flow
/**
 * This compoents job is to rerender App
 * every time one of the passed values changes
 * Result: data is requeried.
 */
import React from 'react'
import { observer, inject } from 'mobx-react'
import compose from 'recompose/compose'

import App from './App'

const enhance = compose(inject('store'), observer)

// pass history to re-render on url change
const AppShell = ({ store }: { store: Object }) => (
  <App
    history={store.history.location.pathname}
    treeFilterText={store.treeFilter.text}
    treeFilterId={store.treeFilter.id}
  />
)

export default enhance(AppShell)
