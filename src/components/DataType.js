// @flow
import React from 'react'
import compose from 'recompose/compose'

import Objekt from './Objekt'
import PropertyCollection from './PropertyCollection'
import PCO from './PropertyCollection/PCO'
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
  const showPCO =
    primaryUrl === 'Eigenschaften-Sammlungen' &&
    activeNodeArray[1] &&
    activeNodeArray.length === 3 &&
    activeNodeArray[2] === 'Eigenschaften'

  if (showObjekt) return <Objekt />
  if (showPC) return <PropertyCollection />
  if (showPCO) return <PCO />
  return null
}

export default enhance(DataType)
