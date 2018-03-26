// @flow
import React, { Component } from 'react'
import styled from 'styled-components'
import compose from 'recompose/compose'
import CssBaseline from 'material-ui/CssBaseline'
import Button from 'material-ui/Button'
import Snackbar from 'material-ui/Snackbar'
import get from 'lodash/get'
import Loadable from 'react-loadable'

import AppBar from './AppBar'
import activeNodeArrayData from '../modules/activeNodeArrayData'
import updateAvailableData from '../modules/updateAvailableData'
import ErrorBoundary from './shared/ErrorBoundary'
import LoadingComponent from './shared/LoadingComponent'

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`

const ExportAsync = Loadable({
  loader: () => import('./Export'),
  loading: LoadingComponent,
})
const AltGenerateUrlAsync = Loadable({
  loader: () => import('./AltGenerateUrl'),
  loading: LoadingComponent,
})
const LoginAsync = Loadable({
  loader: () => import('./Login'),
  loading: LoadingComponent,
})
const DataAsync = Loadable({
  loader: () => import('./Data'),
  loading: LoadingComponent,
})
const FourOhFourAsync = Loadable({
  loader: () => import('./FourOhFour'),
  loading: LoadingComponent,
})
const DataGraph = Loadable({
  loader: () => import('./DataGraph'),
  loading: LoadingComponent,
})
const GraphIql = Loadable({
  loader: () => import('./GraphIql'),
  loading: LoadingComponent,
})

const enhance = compose(activeNodeArrayData, updateAvailableData)

type Props = {
  activeNodeArrayData: Object,
  updateAvailableData: Object,
}

type State = {
  stacked: Boolean,
}
class App extends Component<Props, State> {
  state = {
    stacked: false,
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateStacked)
    setTimeout(() => this.updateStacked())
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateStacked)
  }

  updateStacked = () => {
    const { stacked } = this.state
    const w = window
    const d = document
    const e = d.documentElement
    const g = d.getElementsByTagName('body')[0]
    const windowWidth = w.innerWidth || e.clientWidth || g.clientWidth
    const shouldBeStacked = windowWidth < 650
    if (shouldBeStacked !== stacked) {
      this.setState({ stacked: shouldBeStacked })
    }
  }

  render() {
    const { activeNodeArrayData, updateAvailableData } = this.props
    const { stacked } = this.state
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
      url0 === 'artenlistentool' && activeNodeArray[1] === 'url_generieren'
    const showLogin = url0 === 'login'
    const showDataGraph = url0 === 'datagraph'
    const showGraphIql = url0 === 'graphiql'

    return (
      <ErrorBoundary>
        <Container data-stacked={stacked}>
          <CssBaseline />
          <AppBar />
          {showData && <DataAsync stacked={stacked} />}
          {showExport && <ExportAsync stacked={stacked} />}
          {showLogin && <LoginAsync />}
          {show404 && <FourOhFourAsync />}
          {showDataGraph && <DataGraph />}
          {showGraphIql && <GraphIql />}
          {showAltGenerateUrl && <AltGenerateUrlAsync />}
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
                onClick={() => {
                  console.log('TODO')
                  window.location.reload(false)
                }}
              >
                neu laden
              </Button>
            }
          />
        </Container>
      </ErrorBoundary>
    )
  }
}

export default enhance(App)
