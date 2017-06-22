// @flow
import React from 'react'
import { /*observer,*/ inject } from 'mobx-react'
import compose from 'recompose/compose'

import Objekt from './Objekt/index'
import PropertyCollection from './PropertyCollection'
import RelationCollection from './RelationCollection'
import Exporte from './Exporte'
import Login from './Login'
import FourOhFour from './FourOhFour'

const enhance = compose(inject('store') /*, observer*/)

const Main = ({ store }: { store: Object }) => {
  const primaryUrl = store.activeNodeArray[0]
  const show404 = ![
    'Taxonomien',
    'Eigenschaften-Sammlungen',
    'Beziehungs-Sammlungen',
    'Organisationen',
    'export',
    'import',
    'login',
  ].includes(primaryUrl)
  return (
    <div>
      {primaryUrl === 'Taxonomien' && store.activeTaxonomyObject && <Objekt />}
      {primaryUrl === 'Eigenschaften-Sammlungen' && <PropertyCollection />}
      {primaryUrl === 'Beziehungs-Sammlungen' && <RelationCollection />}
      {primaryUrl === 'export' && <Exporte />}
      {primaryUrl === 'login' && <Login />}
      {show404 && <FourOhFour />}
    </div>
  )
}

export default enhance(Main)
