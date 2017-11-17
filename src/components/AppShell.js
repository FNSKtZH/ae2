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

const withData = graphql(activeNodeArrayQgl)

const treeFilterTextData = graphql(treeFilterTextGql, {
  name: 'treeFilterTextData',
})

const enhance = compose(withData, treeFilterTextData)

// pass history to re-render on url change
const AppShell = ({
  data,
  treeFilterTextData,
}: {
  data: Object,
  treeFilterTextData: Object,
}) => {
  const activeNodeArray = data.activeNodeArray[0].value
  const { treeFilterText } = treeFilterTextData

  return (
    <App activeNodeArray={activeNodeArray} treeFilterText={treeFilterText} />
  )
}

export default enhance(AppShell)
