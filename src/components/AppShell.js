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
import treeFilterGql from '../modules/treeFilterGql'

const activeNodeArrayData = graphql(activeNodeArrayQgl, {
  name: 'activeNodeArrayData',
})
const treeFilterData = graphql(treeFilterGql, {
  name: 'treeFilterData',
})

const enhance = compose(activeNodeArrayData, treeFilterData)

const AppShell = ({
  activeNodeArrayData,
  treeFilterData,
}: {
  activeNodeArrayData: Object,
  treeFilterData: Object,
}) => {
  const activeNodeArray = activeNodeArrayData.activeNodeArray || []
  const treeFilterText =
    treeFilterData.treeFilter && treeFilterData.treeFilter.text
      ? treeFilterData.treeFilter.text
      : ''
  const treeFilterId =
    treeFilterData.treeFilter && treeFilterData.treeFilter.id
      ? treeFilterData.treeFilter.id
      : null

  return (
    <App
      // pass variables to re-render on change
      activeNodeArray={activeNodeArray}
      treeFilterText={treeFilterText}
      treeFilterId={treeFilterId}
    />
  )
}

export default enhance(AppShell)
