// @flow
import React, { Component } from 'react'
import styled from 'styled-components'
import compose from 'recompose/compose'
import Reboot from 'material-ui/Reboot'
import get from 'lodash/get'
import Loadable from 'react-loadable'

import AppBar from './AppBar'
import activeNodeArrayData from '../modules/activeNodeArrayData'
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

const enhance = compose(activeNodeArrayData)

type Props = {
  activeNodeArrayData: Object,
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
    console.log('windowWidth:', windowWidth)
    const shouldBeStacked = windowWidth < 500
    if (shouldBeStacked !== stacked) {
      this.setState({ stacked: shouldBeStacked })
    }
  }

  render() {
    const { activeNodeArrayData } = this.props
    const { stacked } = this.state
    const activeNodeArray = get(activeNodeArrayData, 'activeNodeArray', [])
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
    const showLogin = url0 === 'login'
    console.log('stacked:', stacked)

    return (
      <ErrorBoundary>
        <Container>
          <Reboot />
          <AppBar />
          {showData && <DataAsync />}
          {showExport && <ExportAsync />}
          {showLogin && <LoginAsync />}
          {show404 && <FourOhFourAsync />}
        </Container>
      </ErrorBoundary>
    )
  }
}

export default enhance(App)
