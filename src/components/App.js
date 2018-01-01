// @flow
import React from 'react'
import styled from 'styled-components'
import compose from 'recompose/compose'

import AppBar from './AppBar'
import Data from './Data'
import Export from './Export'
import Login from './Login'
import FourOhFour from './FourOhFour'
import activeNodeArrayData from '../modules/activeNodeArrayData'
import loginData from '../modules/loginData'

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`

const enhance = compose(activeNodeArrayData, loginData)

const App = ({ activeNodeArrayData }: { activeNodeArrayData: Object }) => {
  const activeNodeArray = activeNodeArrayData.activeNodeArray || []
  const url0 =
    activeNodeArray[0] && activeNodeArray[0].toLowerCase()
      ? activeNodeArray[0].toLowerCase()
      : null
  const show404 = ![
    'taxonomien',
    'eigenschaften-sammlungen',
    'organisationen',
    'export',
    'login',
    'benutzer',
  ].includes(url0)
  const showData = [
    'taxonomien',
    'eigenschaften-sammlungen',
    'benutzer',
    'organisationen',
  ].includes(url0)
  const showExport = url0 === 'export'
  const showLogin = url0 === 'login'

  return (
    <Container>
      <AppBar />
      {showData && <Data />}
      {showExport && <Export />}
      {showLogin && <Login />}
      {show404 && <FourOhFour />}
    </Container>
  )
}

export default enhance(App)
