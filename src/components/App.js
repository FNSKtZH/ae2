// @flow
import React from 'react'
import styled from 'styled-components'
import { /*observer,*/ inject } from 'mobx-react'
import compose from 'recompose/compose'

import AppBar from './AppBar'
import Data from './Data'
import Export from './Export'
import ImportPc from './ImportPc'
import ImportRc from './ImportRc'
import Organisation from './Organisation'
import Login from './Login'
import FourOhFour from './FourOhFour'

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`

const enhance = compose(inject('store') /*, observer*/)

const App = ({ store, nodes }: { store: Object, nodes: Array<Object> }) => {
  const url0 = store.activeNodeArray[0]
  const url1 = store.activeNodeArray[1]
  const show404 = ![
    'taxonomien',
    'eigenschaften-sammlungen',
    'beziehungs-sammlungen',
    'organisationen',
    'export',
    'import',
    'login',
  ].includes(url0.toLowerCase())
  const showData = [
    'taxonomien',
    'eigenschaften-sammlungen',
    'beziehungs-sammlungen',
  ].includes(url0.toLowerCase())
  const showExport = url0.toLowerCase() === 'export'
  const showOrganisation = url0.toLowerCase() === 'organisationen'
  const showLogin = url0.toLowerCase() === 'login'
  const showImportPc =
    url0.toLowerCase() === 'import' &&
    url1.toLowerCase() === 'eigenschaften-sammlungen'
  const showImportRc =
    url0.toLowerCase() === 'import' &&
    url1.toLowerCase() === 'beziehungs-sammlungen'

  return (
    <Container>
      <AppBar />
      {showData && <Data nodes={nodes} />}
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
