// @flow
import React from 'react'
import { /*observer,*/ inject } from 'mobx-react'
import compose from 'recompose/compose'

import Objekt from './Objekt/index'
import PropertyCollection from './PropertyCollection'

const enhance = compose(inject('store') /*, observer*/)

const DataType = ({ store }: { store: Object }) => {
  const primaryUrl = store.activeNodeArray[0]

  return (
    <div>
      {primaryUrl === 'Taxonomien' && store.activeTaxonomyObject && <Objekt />}
      {primaryUrl === 'Eigenschaften-Sammlungen' && <PropertyCollection />}
    </div>
  )
}

export default enhance(DataType)
