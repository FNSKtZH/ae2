import React from 'react'
import { ApolloProvider } from '@apollo/client'
import { navigate } from 'gatsby'
// importing isomorphic-fetch is essential
// otherwise apollo errors during the build
// see: https://github.com/gatsbyjs/gatsby/issues/11225#issuecomment-457211628
import 'isomorphic-fetch'
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';

import 'simplebar/dist/simplebar.min.css'

// see: https://github.com/fontsource/fontsource/tree/master/packages/roboto-mono
import '@fontsource/roboto'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
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
  typeof window !== 'undefined' && setUserFromIdb({ idb, mobxStore })

  const myClient = client({ idb, mobxStore })

  const { setActiveNodeArray } = mobxStore

  typeof window !== 'undefined' &&
    setLoginFromIdb({ client: myClient, idb, mobxStore })

  // initiate activeNodeArray
  setActiveNodeArray(getActiveNodeArrayFromPathname())

  return (
    <IdbProvider value={idb}>
      <MobxProvider value={mobxStore}>
        <ApolloProvider client={myClient}>
          <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>{element}</ThemeProvider>
          </StyledEngineProvider>
        </ApolloProvider>
      </MobxProvider>
    </IdbProvider>
  );
}

export default App
