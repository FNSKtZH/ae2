// @flow
import React from 'react'
import { /*observer,*/ inject } from 'mobx-react'
import { graphql } from 'react-apollo'
import compose from 'recompose/compose'

import Objekt from './Objekt'
import PropertyCollection from './PropertyCollection'
import activeNodeArrayGql from '../modules/activeNodeArrayGql'
import activeObjectIdGql from '../modules/activeObjectIdGql'

const activeNodeArrayData = graphql(activeNodeArrayGql, {
  name: 'activeNodeArrayData',
})

const activeObjectIdData = graphql(activeObjectIdGql, {
  name: 'activeObjectIdData',
})

const enhance = compose(
  inject('store'),
  activeNodeArrayData,
  activeObjectIdData /*, observer*/
)

const DataType = ({
  store,
  activeNodeArrayData,
  activeObjectIdData,
}: {
  store: Object,
  activeNodeArrayData: Object,
  activeObjectIdData: Object,
}) => {
  const activeObjectId =
    activeObjectIdData &&
    activeObjectIdData.activeObjectId &&
    activeObjectIdData.activeObjectId[0].value
      ? activeObjectIdData.activeObjectId[0].value
      : null
  const activeNodeArray =
    activeNodeArrayData &&
    activeNodeArrayData.activeNodeArray &&
    activeNodeArrayData.activeNodeArray[0].value
      ? activeNodeArrayData.activeNodeArray[0].value
      : []
  const primaryUrl = activeNodeArray[0]

  return (
    <div>
      {primaryUrl === 'Taxonomien' && activeObjectId && <Objekt />}
      {primaryUrl === 'Eigenschaften-Sammlungen' && <PropertyCollection />}
    </div>
  )
}

export default enhance(DataType)
