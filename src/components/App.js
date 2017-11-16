// @flow
import React from 'react'
import styled from 'styled-components'
import { observer, inject } from 'mobx-react'
import { graphql } from 'react-apollo'
//import { toJS } from 'mobx'
import compose from 'recompose/compose'
import Snackbar from 'material-ui/Snackbar'

import AppData from './AppData'
import AppBar from './AppBar'
import Data from './Data'
import Export from './Export'
import ImportPc from './ImportPc'
import ImportRc from './ImportRc'
import Organisation from './Organisation'
import Login from './Login'
import FourOhFour from './FourOhFour'
import activeNodeArrayGql from '../modules/activeNodeArrayGql'

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`

const activeNodeArrayData = graphql(activeNodeArrayGql, {
  name: 'activeNodeArrayData',
})

const enhance = compose(inject('store'), activeNodeArrayData, AppData, observer)

const App = ({
  store,
  data,
  activeNodeArrayData,
}: {
  store: Object,
  data: Object,
  activeNodeArrayData: Object,
}) => {
  const { error, loading } = data
  const { activeNodeArray } = activeNodeArrayData
  store.setProps(data)

  const url0 =
    activeNodeArray && activeNodeArray[0] && activeNodeArray[0].toLowerCase()
      ? activeNodeArray[0].toLowerCase()
      : null
  const url1 =
    activeNodeArray && activeNodeArray[1] && activeNodeArray[1].toLowerCase()
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
      <Snackbar
        open={loading}
        message="lade Daten..."
        bodyStyle={{
          maxWidth: 100,
          minWidth: 100,
          backgroundColor: 'rgb(217, 78, 0)',
        }}
      />
      {error && <div> {error.message} </div>}
      {showData && <Data data={data} />}
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
