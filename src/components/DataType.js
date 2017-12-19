// @flow
import React from 'react'
import compose from 'recompose/compose'

import Objekt from './Objekt'
import PropertyCollection from './PropertyCollection'
import activeNodeArrayData from '../modules/activeNodeArrayData'
import getActiveObjectIdFromNodeArray from '../modules/getActiveObjectIdFromNodeArray'

const enhance = compose(activeNodeArrayData)

const DataType = ({ activeNodeArrayData }: { activeNodeArrayData: Object }) => {
  const { activeNodeArray } = activeNodeArrayData
  const activeObjectId = getActiveObjectIdFromNodeArray(activeNodeArray)
  const primaryUrl = activeNodeArray[0]
  const showObjekt = primaryUrl === 'Taxonomien' && activeObjectId
  const showPC =
    primaryUrl === 'Eigenschaften-Sammlungen' &&
    activeNodeArray[1] &&
    activeNodeArray.length === 2

  if (showObjekt) return <Objekt />
  if (showPC) return <PropertyCollection />
  return null
}

export default enhance(DataType)
