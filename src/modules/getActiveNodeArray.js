// @flow
import app from 'ampersand-app'

import activeNodeArrayGql from './activeNodeArrayGql'

export default (): Array<string> => {
  // at startup client is undefined
  if (!app.client) return []
  console.log('getActiveNodeArray running')
  return app.client.readQuery({
    query: activeNodeArrayGql,
  }).activeNodeArray
}
