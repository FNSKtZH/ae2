// @flow
import React from 'react'
import { observer, inject } from 'mobx-react'
import compose from 'recompose/compose'

import Objekt from './Objekt'
import PropertyCollection from './PropertyCollection'
import RelationCollection from './RelationCollection'
import Exporte from './Exporte'
import FourOhFour from './FourOhFour'

const enhance = compose(inject('store'), observer)

const Main = ({ store }: { store: Object }) => {
  const primaryUrl = store.activeNodeArray[0]
  const show404 = ![
    'Taxonomien',
    'Eigenschaften-Sammlungen',
    'Beziehungs-Sammlungen',
    'export',
  ].includes(primaryUrl)
  return (
    <div>
      {primaryUrl === 'Taxonomien' && <Objekt />}
      {primaryUrl === 'Eigenschaften-Sammlungen' && <PropertyCollection />}
      {primaryUrl === 'Beziehungs-Sammlungen' && <RelationCollection />}
      {primaryUrl === 'export' && <Exporte />}
      {show404 && <FourOhFour />}
    </div>
  )
}

export default enhance(Main)
