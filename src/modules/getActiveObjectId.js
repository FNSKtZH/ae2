// @flow
import app from 'ampersand-app'

import storeQuery from './storeQuery'

export default (): string => {
  const result = app.client.readQuery({
    query: storeQuery,
    variables: { id: 'activeNodeArray' },
  })
  const activeNodeArray = result.store[0].value
  if (activeNodeArray.length > 2 && activeNodeArray[0] === 'Taxonomien') {
    return activeNodeArray[activeNodeArray.length - 1]
  }
  return '99999999-9999-9999-9999-999999999999'
}
