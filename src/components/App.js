// @flow
import React from 'react'
import styled from 'styled-components'
import compose from 'recompose/compose'

import AppBar from './AppBar'
import Data from './Data'
import Export from './Export'
import ImportPc from './ImportPc'
import ImportRc from './ImportRc'
import Organisation from './Organisation'
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
  const url1 = activeNodeArray[1] && activeNodeArray[1].toLowerCase()
  const show404 =
    ![
      'taxonomien',
      'eigenschaften-sammlungen',
      'organisationen',
      'export',
      'import',
      'login',
    ].includes(url0) ||
    (url0 === 'import' &&
      !['eigenschaften-sammlungen', 'beziehungs-sammlungen'].includes(url1))
  const showData = ['taxonomien', 'eigenschaften-sammlungen'].includes(url0)
  const showExport = url0 === 'export'
  const showOrganisation = url0 === 'organisationen'
  const showLogin = url0 === 'login'
  const showImportPc = url0 === 'import' && url1 === 'eigenschaften-sammlungen'
  const showImportRc = url0 === 'import' && url1 === 'beziehungs-sammlungen'

  return (
    <Container>
      <AppBar />
      {showData && <Data />}
      {showExport && <Export />}
      {showImportPc && <ImportPc />}
      {showImportRc && <ImportRc />}
      {showOrganisation && <Organisation />}
      {showLogin && <Login />}
      {show404 && <FourOhFour />}
    </Container>
  )
}

export default enhance(App)
