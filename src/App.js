import React from 'react'
import { ApolloProvider } from '@apollo/react-hooks'
import { navigate } from 'gatsby'

import { MuiThemeProvider } from '@material-ui/core/styles'

import theme from './theme'
import './index.css'
import 'react-reflex/styles.css'
import getActiveNodeArrayFromPathname from './modules/getActiveNodeArrayFromPathname'
import initializeIdb from './modules/initializeIdb'
import setLoginFromIdb from './modules/setLoginFromIdb'
import detectIE from './modules/detectIE'
import client from './client'
import { Provider as IdbProvider } from './idbContext'
import { Provider as MobxProvider } from './mobxStoreContext'
import MobxStore from './mobxStore'
import setUserFromIdb from './modules/setUserFromIdb'

const App = ({ element }) => {
  const ieVersion = detectIE()
  if (!!ieVersion && ieVersion < 12 && typeof window !== 'undefined') {
    return window.alert(`Sorry: Internet Explorer wird nicht unterstützt.
    Wir empfehlen eine aktuelle Version von Chrome oder Firefox`)
  }

  const idb = initializeIdb()

  const mobxStore = MobxStore({ navigate }).create()
  setUserFromIdb({ idb, mobxStore })

  const myClient = client({ idb, mobxStore })

  const { setActiveNodeArray } = mobxStore

  setLoginFromIdb({ client: myClient, idb, mobxStore })

  // initiate activeNodeArray
  setActiveNodeArray(getActiveNodeArrayFromPathname())

  return (
    <IdbProvider value={idb}>
      <MobxProvider value={mobxStore}>
        <ApolloProvider client={myClient}>
          <MuiThemeProvider theme={theme}>{element}</MuiThemeProvider>
        </ApolloProvider>
      </MobxProvider>
    </IdbProvider>
  )
}

export default App
