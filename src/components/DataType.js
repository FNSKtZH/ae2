// @flow
import React from 'react'
import { /*observer,*/ inject } from 'mobx-react'
import { graphql } from 'react-apollo'
import compose from 'recompose/compose'

import Objekt from './Objekt'
import PropertyCollection from './PropertyCollection'
import activeNodeArrayGql from '../modules/activeNodeArrayGql'
import getActiveObjectIdFromNodeArray from '../modules/getActiveObjectIdFromNodeArray'

const activeNodeArrayData = graphql(activeNodeArrayGql, {
  name: 'activeNodeArrayData',
})

const enhance = compose(inject('store'), activeNodeArrayData)

const DataType = ({
  store,
  activeNodeArrayData,
}: {
  store: Object,
  activeNodeArrayData: Object,
}) => {
  const { activeNodeArray } = activeNodeArrayData
  const activeObjectId = getActiveObjectIdFromNodeArray(activeNodeArray)
  const primaryUrl = activeNodeArray[0]

  return (
    <div>
      {primaryUrl === 'Taxonomien' && activeObjectId && <Objekt />}
      {primaryUrl === 'Eigenschaften-Sammlungen' && <PropertyCollection />}
    </div>
  )
}

export default enhance(DataType)
