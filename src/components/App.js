// @flow
import React from 'react'
import styled from 'styled-components'
import compose from 'recompose/compose'
import Reboot from 'material-ui-next/Reboot'
import get from 'lodash/get'

import AppBar from './AppBar'
import Data from './Data'
import Export from './Export'
import Login from './Login'
import FourOhFour from './FourOhFour'
import activeNodeArrayData from '../modules/activeNodeArrayData'
import loginData from '../modules/loginData'
import ErrorBoundary from './shared/ErrorBoundary'

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`

const enhance = compose(activeNodeArrayData, loginData)

const App = ({ activeNodeArrayData }: { activeNodeArrayData: Object }) => {
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

  return (
    <ErrorBoundary>
      <Container>
        <Reboot />
        <AppBar />
        {showData && <Data />}
        {showExport && <Export />}
        {showLogin && <Login />}
        {show404 && <FourOhFour />}
      </Container>
    </ErrorBoundary>
  )
}

export default enhance(App)
