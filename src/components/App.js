// @flow
import React, { lazy, Suspense, useState, useEffect, useCallback } from 'react'
import styled from 'styled-components'
import compose from 'recompose/compose'
import CssBaseline from '@material-ui/core/CssBaseline'
import Button from '@material-ui/core/Button'
import Snackbar from '@material-ui/core/Snackbar'
import get from 'lodash/get'
import debounce from 'lodash/debounce'

import AppBar from './AppBar'
import withActiveNodeArrayData from '../modules/withActiveNodeArrayData'
import updateAvailableData from '../modules/updateAvailableData'
import ErrorBoundary from './shared/ErrorBoundary'
import LazyImportFallback from './shared/LazyImportFallback'

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`
const Export = lazy(() => import('./Export'))
const AltGenerateUrl = lazy(() => import('./AltGenerateUrl'))
const Login = lazy(() => import('./Login'))
const Data = lazy(() => import('./Data'))
const FourOhFour = lazy(() => import('./FourOhFour'))
const DataGraph = lazy(() => import('./DataGraph'))
const GraphIql = lazy(() => import('./GraphIql'))

const enhance = compose(
  withActiveNodeArrayData,
  updateAvailableData,
)
const App = ({
  activeNodeArrayData,
  updateAvailableData,
}: {
  activeNodeArrayData: Object,
  updateAvailableData: Object,
}) => {
  const [stacked, setStacked] = useState(false)

  const activeNodeArray = get(activeNodeArrayData, 'activeNodeArray', [])
  const updateAvailable = get(updateAvailableData, 'updateAvailable', false)
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
  const showDataGraph = url0 === 'datagraph'
  const showGraphIql = url0 === 'graphiql'

  const updateStacked = useCallback(() => {
    const w = window
    const d = document
    const e = d.documentElement
    const g = d.getElementsByTagName('body')[0]
    const windowWidth = w.innerWidth || e.clientWidth || g.clientWidth
    const shouldBeStacked = windowWidth < 650
    setStacked(shouldBeStacked)
  })

  useEffect(() => {
    updateStacked()
  }, [])

  useEffect(() => {
    window.addEventListener('resize', debounce(updateStacked, 100))
    return () => window.removeEventListener('resize', updateStacked)
  }, [])

  const onClickReload = useCallback(() => window.location.reload(false))

  return (
    <ErrorBoundary>
      <Container data-stacked={stacked}>
        <Suspense fallback={<LazyImportFallback />}>
          <CssBaseline />
          <AppBar />
          {showData && <Data stacked={stacked} />}
          {showExport && <Export stacked={stacked} />}
          {showLogin && <Login />}
          {show404 && <FourOhFour />}
          {showDataGraph && <DataGraph />}
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
        </Suspense>
      </Container>
    </ErrorBoundary>
  )
}

export default enhance(App)
