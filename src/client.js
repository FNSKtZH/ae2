import { ApolloClient, ApolloLink, InMemoryCache } from '@apollo/client'
import { BatchHttpLink } from '@apollo/client/link/batch-http'
import { setContext } from '@apollo/client/link/context'
import jwtDecode from 'jwt-decode'

import './index.css'
import 'react-reflex/styles.css'
import graphQlUri from './modules/graphQlUri'

export default ({ idb, mobxStore }) => {
  /**
   * On the next line Firefox 45.3.0 errors out with:
   * Unhandled Rejection (OpenFailedError): UnknownError The operation failed
   * for reasons unrelated to the database itself and not covered by any other error code
   */
  const authLink = setContext(async () => {
    const { token } = mobxStore.login
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

  // use httpLink _instead_ of batchHttpLink in order not to batch
  /*
  const httpLink = createHttpLink({
    uri: graphQlUri(),
  })*/
  const batchHttpLink = new BatchHttpLink({ uri: graphQlUri() })
  const client = new ApolloClient({
    link: ApolloLink.from([authLink, batchHttpLink]),
    cache: new InMemoryCache(),
  })
  return client
}
