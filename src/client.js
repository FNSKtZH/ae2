// @flow
import { ApolloClient } from 'apollo-client'
//import { createHttpLink } from 'apollo-link-http'
import { BatchHttpLink } from 'apollo-link-batch-http'
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloLink } from 'apollo-link'
import get from 'lodash/get'
import jwtDecode from 'jwt-decode'

import './index.css'
import 'react-reflex/styles.css'
import graphQlUri from './modules/graphQlUri'

export default async ({ idb, history, mobxStore }) => {
  /**
   * On the next line Firefox 45.3.0 errors out with:
   * Unhandled Rejection (OpenFailedError): UnknownError The operation failed
   * for reasons unrelated to the database itself and not covered by any other error code
   */
  const authMiddleware = setContext(async () => {
    const user = await idb.users.toArray()
    const token = get(user, '[0].token')
    if (token) {
      const tokenDecoded = jwtDecode(token)
      // for unknown reason, date.now returns three more after comma
      // numbers than the exp date contains
      const tokenIsValid = tokenDecoded.exp > Date.now() / 1000
      if (tokenIsValid) {
        return {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      } else {
        const { setLogin } = mobxStore
        // token is not valid any more > remove it
        idb.users.clear()
        setLogin({
          username: 'Login abgelaufen',
          token: '',
        })
        setTimeout(
          () =>
            setLogin({
              username: '',
              token: '',
            }),
          10000,
        )
      }
      // TODO: tell user "Ihre Anmeldung ist abgelaufen"
    }
  })

  const cache = new InMemoryCache()
  // use httpLink _instead_ of batchHttpLink in order not to batch
  /*
  const httpLink = createHttpLink({
    uri: graphQlUri(),
  })*/
  const batchHttpLink = new BatchHttpLink({ uri: graphQlUri() })
  const client = new ApolloClient({
    link: ApolloLink.from([authMiddleware, batchHttpLink]),
    cache,
  })
  return client
}
