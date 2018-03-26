import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { withClientState } from 'apollo-link-state'
import { ApolloProvider, Query } from 'react-apollo'
import gql from 'graphql-tag'
import { ApolloLink } from 'apollo-link'
import get from 'lodash/get'
import jwtDecode from 'jwt-decode'
import isUuid from 'is-uuid'

import { MuiThemeProvider } from 'material-ui/styles'
import app from 'ampersand-app'
import createHistory from 'history/createBrowserHistory'

import theme from './theme'
import './index.css'
import 'react-reflex/styles.css'
import App from './components/App'
import registerServiceWorker from './registerServiceWorker'
import getActiveNodeArrayFromPathname from './modules/getActiveNodeArrayFromPathname'
import activeNodeArrayMutation from './modules/activeNodeArrayMutation'
import initializeIdb from './modules/initializeIdb'
import setLoginFromIdb from './modules/setLoginFromIdb'
import setLoginMutation from './modules/loginMutation'
import graphQlUri from './modules/graphQlUri'
import defaults from './store/defaults'
import resolvers from './store/resolvers'
import getUrlForObject from './modules/getUrlForObject'

const launchApp = async () => {
  try {
    const idb = initializeIdb()

    const authMiddleware = setContext(async () => {
      let users
      users = await idb.users.toArray()
      const token = get(users, '[0].token')
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
            10000
          )
        }
        // TODO: tell user "Ihre Anmeldung ist abgelaufen"
      }
    })

    const cache = new InMemoryCache()
    const stateLink = withClientState({
      resolvers,
      cache,
      defaults,
    })
    const httpLink = createHttpLink({
      uri: graphQlUri(),
    })
    const client = new ApolloClient({
      link: ApolloLink.from([stateLink, authMiddleware, httpLink]),
      cache,
    })

    // configure history
    const history = createHistory()
    // make ui follow when user uses browser back and forward buttons
    history.listen(location => {
      const activeNodeArray = getActiveNodeArrayFromPathname()
      client.mutate({
        mutation: activeNodeArrayMutation,
        variables: {
          value: activeNodeArray,
        },
        optimisticResponse: {
          setActiveNodeArray: {
            activeNodeArray,
            __typename: 'ActiveNodeArray',
          },
          __typename: 'Mutation',
        },
      })
    })

    app.extend({
      init() {
        this.client = client
        this.history = history
        this.idb = idb
      },
    })
    app.init()
    // set login from idb
    setLoginFromIdb(client)
    // make app accessible in console
    window.app = app

    // initiate activeNodeArray
    let activeNodeArray = getActiveNodeArrayFromPathname()
    client.mutate({
      mutation: activeNodeArrayMutation,
      variables: {
        value: activeNodeArray,
      },
      optimisticResponse: {
        setActiveNodeArray: {
          activeNodeArray,
          __typename: 'ActiveNodeArray',
        },
        __typename: 'Mutation',
      },
    })
    /**
     * check if old url was passed that contains objectId-Param
     * for instance: from artenlistentool like this:
     * /index.html?id=AD0B10AA-707D-42C6-B68D-8F88CCD2F0B3
     */
    const idParam = new URLSearchParams(
      document.location.search.substring(1)
    ).get('id')
    const objectId =
      idParam && isUuid.anyNonNil(idParam) ? idParam.toLowerCase() : null

    ReactDOM.render(
      <ApolloProvider client={client}>
        <MuiThemeProvider theme={theme}>
          {!!objectId && (
            <Query
              query={gql`
                query ObjectQuery($id: UUID!) {
                  objectById(id: $id) {
                    id
                    taxonomyByTaxonomyId {
                      id
                      type
                    }
                    objectByParentId {
                      id
                      objectByParentId {
                        id
                        objectByParentId {
                          id
                          objectByParentId {
                            id
                            objectByParentId {
                              id
                              objectByParentId {
                                id
                                objectByParentId {
                                  id
                                  objectByParentId {
                                    id
                                    objectByParentId {
                                      id
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              `}
              variables={{ id: objectId }}
            >
              {({ loading, error, data: { objectById } }) => {
                if (loading) return 'Loading...'
                if (error) return `Fehler: ${error.message}`
                // if idParam was passed, open object
                const url = getUrlForObject(objectById)
                history.push(`/${url.join('/')}`)
                return <App />
              }}
            </Query>
          )}
          {!objectId && <App />}
        </MuiThemeProvider>
      </ApolloProvider>,
      document.getElementById('root')
    )

    registerServiceWorker(client)
  } catch (error) {
    console.log('Error in index.js: ', error)
  }
}

launchApp()
