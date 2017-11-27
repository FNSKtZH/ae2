// @flow
import React from 'react'
import styled from 'styled-components'
import { graphql, withApollo } from 'react-apollo'
import compose from 'recompose/compose'
import Snackbar from 'material-ui/Snackbar'
import app from 'ampersand-app'

import AppBar from './AppBar'
import Data from './Data'
import Export from './Export'
import ImportPc from './ImportPc'
import ImportRc from './ImportRc'
import Organisation from './Organisation'
import Login from './Login'
import FourOhFour from './FourOhFour'
import activeNodeArrayGql from '../modules/activeNodeArrayGql'
import treeFilterGql from '../modules/treeFilterGql'
import exportCategoriesGql from '../modules/exportCategoriesGql'
import appQuery from '../modules/appQuery'
import variablesFromStore from '../modules/variablesFromStore'
import getUrlForObject from '../modules/getUrlForObject'
import treeFilterMutation from '../modules/treeFilterMutation'

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`

const activeNodeArrayData = graphql(activeNodeArrayGql, {
  name: 'activeNodeArrayData',
})
const treeFilterData = graphql(treeFilterGql, {
  name: 'treeFilterData',
})
const exportCategoriesData = graphql(exportCategoriesGql, {
  name: 'exportCategoriesData',
})
const appData = graphql(appQuery, {
  options: ({
    activeNodeArrayData,
    treeFilterData,
    exportCategoriesData,
  }: {
    activeNodeArrayData: Object,
    treeFilterData: Object,
    exportCategoriesData: Object,
  }) => ({
    variables: variablesFromStore({
      activeNodeArrayData,
      treeFilterData,
      exportCategoriesData,
    }),
    name: 'appData',
  }),
})

const enhance = compose(
  withApollo,
  activeNodeArrayData,
  treeFilterData,
  exportCategoriesData,
  appData
)

const App = ({
  client,
  appData,
  data,
  activeNodeArrayData,
  treeFilterData,
}: {
  client: Object,
  appData: Object,
  data: Object,
  activeNodeArrayData: Object,
  treeFilterData: Object,
}) => {
  //console.log('App rendering, data:', data)
  /**
   * TODO
   * wtf appData is undefined!?
   * instead data arrives in variable data!
   */
  //console.log('App: appData:', appData)
  //console.log('App: data:', data)
  const { error, loading, objectUrlData } = data
  const { activeNodeArray } = activeNodeArrayData

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

  /**
   * TODO
   * check if treeFilterId exists
   * if true:
   * pass query result for objectUrlData to getUrlForObject()
   * then update activeNodeArray with that result
   * and reset treeFilterId
   */
  const treeFilterId =
    treeFilterData.treeFilter && treeFilterData.treeFilter.id
      ? treeFilterData.treeFilter.id
      : null
  const treeFilterText =
    treeFilterData.treeFilter && treeFilterData.treeFilter.text
      ? treeFilterData.treeFilter.text
      : null
  if (treeFilterId && treeFilterId !== '99999999-9999-9999-9999-999999999999') {
    console.log('App: treeFilterId:', treeFilterId)
    //console.log('App: appData:', appData)
    console.log('App: objectUrlData:', objectUrlData)
    const url = getUrlForObject(objectUrlData)
    console.log('App: url:', url)
    app.history.push(`/${url.join('/')}`)
    client.mutate({
      mutation: treeFilterMutation,
      variables: { id: null, text: treeFilterText },
    })
  }

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
      {showExport && <Export data={data} />}
      {showImportPc && <ImportPc />}
      {showImportRc && <ImportRc />}
      {showOrganisation && <Organisation />}
      {showLogin && <Login />}
      {show404 && <FourOhFour />}
    </Container>
  )
}

export default enhance(App)
