// @flow
import React from 'react'
import styled from 'styled-components'
import compose from 'recompose/compose'

import AppBar from './AppBar'
import Data from './Data'
import Export from './Export'
import Organisation from './Organisation'
import Login from './Login'
import Benutzer from './Benutzer'
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
  const showData = ['taxonomien', 'eigenschaften-sammlungen'].includes(url0)
  const showExport = url0 === 'export'
  const showOrganisation = url0 === 'organisationen'
  const showLogin = url0 === 'login'
  const showBenutzer = url0 === 'benutzer' && activeNodeArray.length === 2

  return (
    <Container>
      <AppBar />
      {showData && <Data />}
      {showExport && <Export />}
      {showOrganisation && <Organisation />}
      {showLogin && <Login />}
      {showBenutzer && <Benutzer />}
      {show404 && <FourOhFour />}
    </Container>
  )
}

export default enhance(App)
