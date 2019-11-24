import React, { useState, useCallback, useContext } from 'react'
import styled from 'styled-components'
import Button from '@material-ui/core/Button'
import Snackbar from '@material-ui/core/Snackbar'
import { observer } from 'mobx-react-lite'
import ErrorBoundary from 'react-error-boundary'
import loadable from '@loadable/component'
import ReactResizeDetector from 'react-resize-detector'

import Layout from './Layout'
//import LazyImportFallback from './shared/LazyImportFallback'
import mobxStoreContext from '../mobxStoreContext'

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`

// ReactDOMServer does not yet support Suspense
//const Export = lazy(() => import('./Export'))
const Export = loadable(() => import('./Export'))
//const AltGenerateUrl = lazy(() => import('./AltGenerateUrl'))
const AltGenerateUrl = loadable(() => import('./AltGenerateUrl'))
//const Login = lazy(() => import('./Login'))
const Login = loadable(() => import('./Login'))
//const Data = lazy(() => import('./Data'))
const Data = loadable(() => import('./Data'))
//const FourOhFour = lazy(() => import('./FourOhFour'))
const FourOhFour = loadable(() => import('./FourOhFour'))
//const GraphIql = lazy(() => import('./GraphIql'))
const GraphIql = loadable(() => import('./GraphIql'))

const App = () => {
  const mobxStore = useContext(mobxStoreContext)
  const { updateAvailable } = mobxStore
  const activeNodeArray = mobxStore.activeNodeArray.toJS()

  const url0 =
    activeNodeArray[0] && activeNodeArray[0].toLowerCase()
      ? activeNodeArray[0].toLowerCase()
      : null
  const show404 = ![
    null,
    'arten',
    'lebensräume',
    'eigenschaften-sammlungen',
    'organisationen',
    'export',
    'login',
    'benutzer',
    'datagraph',
    'graphiql',
    'artenlistentool',
  ].includes(url0)
  const showData = [
    null,
    'arten',
    'lebensräume',
    'eigenschaften-sammlungen',
    'benutzer',
    'organisationen',
  ].includes(url0)
  const showExport = url0 === 'export'
  const showAltGenerateUrl =
    url0 === 'artenlistentool' && activeNodeArray[1] === 'waehlen'
  const showLogin = url0 === 'login'
  const showGraphIql = url0 === 'graphiql'

  const [wide, setWide] = useState(false)
  const onResize = useCallback(
    width => {
      if (width > 700 && !wide) {
        setWide(true)
      }
      if (width < 700 && wide) {
        setWide(false)
      }
    },
    [wide],
  )

  const onClickReload = useCallback(
    () => typeof window !== 'undefined' && window.location.reload(false),
    [],
  )

  return (
    <ErrorBoundary>
      <Container>
        <ReactResizeDetector handleWidth onResize={onResize} />
        <Layout>
          {showData && <Data stacked={!wide} />}
          {showExport && <Export stacked={!wide} />}
          {showLogin && <Login />}
          {show404 && <FourOhFour />}
          {showGraphIql && <GraphIql />}
          {showAltGenerateUrl && <AltGenerateUrl />}
          <Snackbar
            open={updateAvailable}
            message={
              <span id="message-id">
                Für arteigenschaften.ch ist ein Update verfügbar
              </span>
            }
            action={
              <Button
                key="undo"
                color="primary"
                size="small"
                onClick={onClickReload}
              >
                neu laden
              </Button>
            }
          />
        </Layout>
      </Container>
    </ErrorBoundary>
  )
}

export default observer(App)
