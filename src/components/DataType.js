// @flow
import React from 'react'
import { /*observer,*/ inject } from 'mobx-react'
import compose from 'recompose/compose'

import Objekt from './Objekt'
import PropertyCollection from './PropertyCollection'
import getActiveNodeArray from '../modules/getActiveNodeArray'

const enhance = compose(inject('store') /*, observer*/)

const DataType = ({
  store,
  activeObject,
}: {
  store: Object,
  activeObject: Object,
}) => {
  const activeNodeArray = getActiveNodeArray()
  const primaryUrl = activeNodeArray[0]

  return (
    <div>
      {primaryUrl === 'Taxonomien' &&
        activeObject && <Objekt activeObject={activeObject} />}
      {primaryUrl === 'Eigenschaften-Sammlungen' && <PropertyCollection />}
    </div>
  )
}

export default enhance(DataType)
