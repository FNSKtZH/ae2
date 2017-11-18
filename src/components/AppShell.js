// @flow
/**
 * This compoents job is to rerender App
 * every time one of the passed values changes
 * Result: data is requeried.
 */
import React from 'react'
import compose from 'recompose/compose'
import { graphql } from 'react-apollo'

import App from './App'
import activeNodeArrayQgl from '../modules/activeNodeArrayGql'
import treeFilterTextGql from '../modules/treeFilterTextGql'
import treeFilterIdGql from '../modules/treeFilterIdGql'

const activeNodeArrayData = graphql(activeNodeArrayQgl, {
  name: 'activeNodeArrayData',
})
const treeFilterTextData = graphql(treeFilterTextGql, {
  name: 'treeFilterTextData',
})
const treeFilterIdData = graphql(treeFilterIdGql, {
  name: 'treeFilterIdData',
})

const enhance = compose(
  activeNodeArrayData,
  treeFilterTextData,
  treeFilterIdData
)

// pass history to re-render on url change
const AppShell = ({
  activeNodeArrayData,
  treeFilterTextData,
  treeFilterIdData,
}: {
  activeNodeArrayData: Object,
  treeFilterTextData: Object,
  treeFilterIdData: Object,
}) => {
  const { activeNodeArray } = activeNodeArrayData
  const { treeFilterText } = treeFilterTextData
  const { treeFilterId } = treeFilterIdData

  return (
    <App
      activeNodeArray={activeNodeArray}
      treeFilterText={treeFilterText}
      treeFilterId={treeFilterId}
    />
  )
}

export default enhance(AppShell)
