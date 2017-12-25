// @flow
import React from 'react'
import compose from 'recompose/compose'

import Objekt from './Objekt'
import PropertyCollection from './PropertyCollection'
import PCO from './PropertyCollection/PCO'
import activeNodeArrayData from '../modules/activeNodeArrayData'
import getActiveObjectIdFromNodeArray from '../modules/getActiveObjectIdFromNodeArray'

const enhance = compose(activeNodeArrayData)

const DataType = ({
  activeNodeArrayData,
  dimensions,
}: {
  activeNodeArrayData: Object,
  dimensions: Object,
}) => {
  const { activeNodeArray } = activeNodeArrayData
  const activeObjectId = getActiveObjectIdFromNodeArray(activeNodeArray)
  const showObjekt = activeNodeArray[0] === 'Taxonomien' && activeObjectId
  const showPC =
    activeNodeArray[0] === 'Eigenschaften-Sammlungen' &&
    activeNodeArray[1] &&
    activeNodeArray.length === 2
  const showPCO =
    activeNodeArray[0] === 'Eigenschaften-Sammlungen' &&
    activeNodeArray[1] &&
    activeNodeArray.length === 3 &&
    activeNodeArray[2] === 'Eigenschaften'

  if (showObjekt) return <Objekt />
  if (showPC) return <PropertyCollection />
  if (showPCO) return <PCO dimensions={dimensions} />
  return null
}

export default enhance(DataType)
