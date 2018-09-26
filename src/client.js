// @flow
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { withClientState } from 'apollo-link-state'
import { ApolloLink } from 'apollo-link'
import get from 'lodash/get'
import jwtDecode from 'jwt-decode'

import './index.css'
import 'react-reflex/styles.css'
import setLoginMutation from './modules/loginMutation'
import graphQlUri from './modules/graphQlUri'
import defaults from './store/defaults'
import resolvers from './store/resolvers'

export default async idb => {
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
        // token is not valid any more > remove it
        idb.users.clear()
        client.mutate({
          mutation: setLoginMutation,
          variables: {
            username: 'Login abgelaufen',
            token: '',
          },
          optimisticResponse: {
            setLoginInStore: {
              username: 'Login abgelaufen',
              token: '',
              __typename: 'Login',
            },
            __typename: 'Mutation',
          },
        })
        setTimeout(
          () =>
            client.mutate({
              mutation: setLoginMutation,
              variables: {
                username: '',
                token: '',
              },
              optimisticResponse: {
                setLoginInStore: {
                  username: '',
                  token: '',
                  __typename: 'Login',
                },
                __typename: 'Mutation',
              },
            }),
          10000,
        )
      }
      // TODO: tell user "Ihre Anmeldung ist abgelaufen"
    }
  })

  const cache = new InMemoryCache()
  const myDefaults = await defaults(idb)
  const stateLink = withClientState({
    resolvers,
    cache,
    defaults: myDefaults,
  })
  const httpLink = createHttpLink({
    uri: graphQlUri(),
  })
  const client = new ApolloClient({
    link: ApolloLink.from([stateLink, authMiddleware, httpLink]),
    cache,
  })
  return client
}
