import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloProvider } from 'react-apollo'
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks'

import { MuiThemeProvider } from '@material-ui/core/styles'
import app from 'ampersand-app'
import createHistory from 'history/createBrowserHistory'

import theme from './theme'
import './index.css'
import 'react-reflex/styles.css'
import registerServiceWorker from './registerServiceWorker'
import getActiveNodeArrayFromPathname from './modules/getActiveNodeArrayFromPathname'
import activeNodeArrayMutation from './modules/activeNodeArrayMutation'
import initializeIdb from './modules/initializeIdb'
import setLoginFromIdb from './modules/setLoginFromIdb'
import Router from './components/Router'
import detectIE from './modules/detectIE'
import client from './client'
import { Provider as IdbProvider } from './idbContext'
import { Provider as HistoryProvider } from './historyContext'

const launchApp = async () => {
  const ieVersion = detectIE()
  if (!!ieVersion && ieVersion < 12)
    return window.alert(`Sorry: Internet Explorer wird nicht unterstützt.
    Wir empfehlen eine aktuelle Version von Chrome oder Firefox`)

  // need to test this on the server
  // sadly did not work
  /*
  console.log('process.env:', process.env)
  console.log(
    'process.env.npm_package_version:',
    process.env.npm_package_version
  )*/

  try {
    const idb = initializeIdb()
    const myClient = await client(idb)

    // configure history
    const history = createHistory()
    // make ui follow when user uses browser back and forward buttons
    history.listen(location => {
      const activeNodeArray = getActiveNodeArrayFromPathname()
      myClient.mutate({
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
        this.client = myClient
        this.history = history
      },
    })
    app.init()
    // set login from idb
    setLoginFromIdb({ client: myClient, idb })
    // make app accessible in console
    window.app = app

    // initiate activeNodeArray
    let activeNodeArray = getActiveNodeArrayFromPathname()
    myClient.mutate({
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

    const idbContext = { idb }
    const historyContext = { history }

    ReactDOM.render(
      <IdbProvider value={idbContext}>
        <HistoryProvider value={historyContext}>
          <ApolloProvider client={myClient}>
            <ApolloHooksProvider client={myClient}>
              <MuiThemeProvider theme={theme}>
                <Router history={history} />
              </MuiThemeProvider>
            </ApolloHooksProvider>
          </ApolloProvider>
        </HistoryProvider>
      </IdbProvider>,
      document.getElementById('root'),
    )

    registerServiceWorker(myClient)
  } catch (error) {
    console.log('Error in index.js: ', error)
  }
}

launchApp()
