// @flow
import React from 'react'
import styled from 'styled-components'
import { withApollo } from 'react-apollo'
import compose from 'recompose/compose'
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
import getUrlForObject from '../modules/getUrlForObject'
import treeFilterMutation from '../modules/treeFilterMutation'

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`

const enhance = compose(
  withApollo,
  activeNodeArrayData,
  treeFilterData,
  objectUrlData
)

const App = ({
  client,
  activeNodeArrayData,
  treeFilterData,
  objectUrlData,
}: {
  client: Object,
  activeNodeArrayData: Object,
  treeFilterData: Object,
  objectUrlData: Object,
}) => {
  const urlObject = get(objectUrlData, 'objectById', {})
  console.log('App: objectUrlData from objectUrlData:', objectUrlData)
  console.log('App: urlObject from objectUrlData:', urlObject)
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
