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

const App = ({
  store,
  nodes,
  categories,
}: {
  store: Object,
  nodes: Array<Object>,
  categories: Array<Object>,
}) => {
  const url0 =
    store.activeNodeArray[0] && store.activeNodeArray[0].toLowerCase()
  const url1 =
    store.activeNodeArray[1] && store.activeNodeArray[1].toLowerCase()
  const show404 =
    ![
      'taxonomien',
      'eigenschaften-sammlungen',
      'beziehungs-sammlungen',
      'organisationen',
      'export',
      'import',
      'login',
    ].includes(url0) ||
    (url0 === 'import' &&
      !['eigenschaften-sammlungen', 'beziehungs-sammlungen'].includes(url1))
  const showData = [
    'taxonomien',
    'eigenschaften-sammlungen',
    'beziehungs-sammlungen',
  ].includes(url0)
  const showExport = url0 === 'export'
  const showOrganisation = url0 === 'organisationen'
  const showLogin = url0 === 'login'
  const showImportPc = url0 === 'import' && url1 === 'eigenschaften-sammlungen'
  const showImportRc = url0 === 'import' && url1 === 'beziehungs-sammlungen'

  return (
    <Container>
      <AppBar />
      {showData && <Data nodes={nodes} />}
      {showExport && <Export categories={categories} />}
      {showImportPc && <ImportPc />}
      {showImportRc && <ImportRc />}
      {showOrganisation && <Organisation />}
      {showLogin && <Login />}
      {show404 && <FourOhFour />}
    </Container>
  )
}

export default enhance(App)
