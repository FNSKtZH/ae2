// @flow
import React from 'react'
import { /*observer,*/ inject } from 'mobx-react'
import { graphql } from 'react-apollo'
import compose from 'recompose/compose'

import Objekt from './Objekt'
import PropertyCollection from './PropertyCollection'
import activeNodeArrayGql from '../modules/activeNodeArrayGql'

const activeNodeArrayData = graphql(activeNodeArrayGql, {
  name: 'activeNodeArrayData',
})

const enhance = compose(inject('store'), activeNodeArrayData /*, observer*/)

const DataType = ({
  store,
  activeObject,
  activeNodeArrayData,
}: {
  store: Object,
  activeObject: Object,
  activeNodeArrayData: Object,
}) => {
  const activeNodeArray =
    activeNodeArrayData &&
    activeNodeArrayData.activeNodeArray &&
    activeNodeArrayData.activeNodeArray[0].value
      ? activeNodeArrayData.activeNodeArray[0].value
      : []
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
