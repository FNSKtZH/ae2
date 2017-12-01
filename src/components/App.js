// @flow
import React from 'react'
import styled from 'styled-components'
import { graphql, withApollo } from 'react-apollo'
import compose from 'recompose/compose'
import Snackbar from 'material-ui/Snackbar'
import app from 'ampersand-app'
import get from 'lodash/get'

import AppBar from './AppBar'
import Data from './Data'
import Export from './Export'
import ImportPc from './ImportPc'
import ImportRc from './ImportRc'
import Organisation from './Organisation'
import Login from './Login'
import FourOhFour from './FourOhFour'
import activeNodeArrayData from '../modules/activeNodeArrayData'
import treeFilterData from '../modules/treeFilterData'
import objectUrlData from '../modules/objectUrlData'
import appQuery from '../modules/appQuery'
import variablesFromStore from '../modules/variablesFromStore'
import getUrlForObject from '../modules/getUrlForObject'
import treeFilterMutation from '../modules/treeFilterMutation'

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`

const appData = graphql(appQuery, {
  options: ({
    activeNodeArrayData,
    treeFilterData,
  }: {
    activeNodeArrayData: Object,
    treeFilterData: Object,
  }) => ({
    variables: variablesFromStore({
      activeNodeArrayData,
      treeFilterData,
    }),
  }),
  name: 'appData',
})

const enhance = compose(
  withApollo,
  activeNodeArrayData,
  treeFilterData,
  appData,
  objectUrlData
)

const App = ({
  client,
  appData,
  activeNodeArrayData,
  treeFilterData,
  objectUrlData,
}: {
  client: Object,
  appData: Object,
  activeNodeArrayData: Object,
  treeFilterData: Object,
  objectUrlData: Object,
}) => {
  console.log('App: appData:', appData)
  const { error, loading } = appData
  const urlObject = get(objectUrlData, 'objectById', {})
  console.log('App: objectUrlData from objectUrlData:', objectUrlData)
  console.log('App: urlObject from objectUrlData:', urlObject)
  // log error out to see in the log when it happens
  // relative to other logs
  if (error) console.log('App: error:', error)
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
    //console.log('App: appData:', appData)
    const url = getUrlForObject(urlObject)
    app.history.push(`/${url.join('/')}`)
    console.log('App: does next step (treeFilterMutation) cause error?')
    client.mutate({
      mutation: treeFilterMutation,
      variables: { id: null, text: treeFilterText },
    })
    console.log('App: next step done')
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
      {showData && <Data data={appData} />}
      {showExport && <Export data={appData} />}
      {showImportPc && <ImportPc />}
      {showImportRc && <ImportRc />}
      {showOrganisation && <Organisation />}
      {showLogin && <Login />}
      {show404 && <FourOhFour />}
    </Container>
  )
}

export default enhance(App)
