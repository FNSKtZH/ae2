// @flow
import app from 'ampersand-app'

import storeQuery from './storeQuery'

export default (): Array<string> => {
  console.log('getActiveNodeArray: client:', app.client)
  if (!app.client) return []
  const result = app.client.readQuery({
    query: storeQuery,
    // why are variables ignored?
    //variables: { id: 'activeNodeArray' },
  })
  const activeNodeArrayDataset = result.store.find(
    a => a.id === 'activeNodeArray'
  )
  if (!activeNodeArrayDataset) return []
  return activeNodeArrayDataset.value
}
