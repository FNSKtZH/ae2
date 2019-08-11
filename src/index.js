import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloProvider } from '@apollo/react-hooks'
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks'

import { MuiThemeProvider } from '@material-ui/core/styles'
import { createBrowserHistory } from 'history'

import theme from './theme'
import './index.css'
import 'react-reflex/styles.css'
import registerServiceWorker from './registerServiceWorker'
import getActiveNodeArrayFromPathname from './modules/getActiveNodeArrayFromPathname'
import initializeIdb from './modules/initializeIdb'
import setLoginFromIdb from './modules/setLoginFromIdb'
import Router from './components/Router'
import detectIE from './modules/detectIE'
import client from './client'
import { Provider as IdbProvider } from './idbContext'
import { Provider as HistoryProvider } from './historyContext'
import { Provider as MobxProvider } from './mobxStoreContext'
import MobxStore from './mobxStore'
import createInitialMobxStore from './mobxStore/initial'

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
    // configure history
    const history = createBrowserHistory()

    const initialMobxStore = await createInitialMobxStore({ idb })
    const mobxStore = MobxStore({ history }).create(initialMobxStore)

    const myClient = await client({ idb, history, mobxStore })

    const { setActiveNodeArray } = mobxStore

    // make ui follow when user uses browser back and forward buttons
    history.listen(location => {
      setActiveNodeArray(getActiveNodeArrayFromPathname())
    })

    setLoginFromIdb({ client: myClient, idb, mobxStore })

    // initiate activeNodeArray
    setActiveNodeArray(getActiveNodeArrayFromPathname())

    ReactDOM.render(
      <IdbProvider value={idb}>
        <MobxProvider value={mobxStore}>
          <HistoryProvider value={history}>
            <ApolloProvider client={myClient}>
              <ApolloHooksProvider client={myClient}>
                <MuiThemeProvider theme={theme}>
                  <Router history={history} />
                </MuiThemeProvider>
              </ApolloHooksProvider>
            </ApolloProvider>
          </HistoryProvider>
        </MobxProvider>
      </IdbProvider>,
      document.getElementById('root'),
    )

    registerServiceWorker({ client: myClient, mobxStore })
  } catch (error) {
    console.log('Error in index.js: ', error)
  }
}

launchApp()
