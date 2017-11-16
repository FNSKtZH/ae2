// @flow
import app from 'ampersand-app'

import treeFilterTextGql from './treeFilterTextGql'

export default (): string => {
  // at startup client is undefined
  if (!app.client) return ''
  console.log('getTreeFilterText running')
  const result = app.client.readQuery({
    query: treeFilterTextGql,
  })
  console.log('getTreeFilterText: result:', result)
  const { treeFilterText } = result
  console.log('getTreeFilterText: treeFilterText:', treeFilterText)
  return treeFilterText
}
