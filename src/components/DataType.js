// @flow
import React from 'react'
import compose from 'recompose/compose'

import Objekt from './Objekt'
import Taxonomy from './Taxonomy'
import PropertyCollection from './PropertyCollection'
import PCO from './PropertyCollection/PCO'
import RCO from './PropertyCollection/RCO'
import Benutzer from './Benutzer'
import Organisation from './Organisation'
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
  const showObjekt =
    activeNodeArray[0] === 'Taxonomien' &&
    activeNodeArray.length > 3 &&
    !!activeObjectId
  const showTaxonomy =
    activeNodeArray[0] === 'Taxonomien' && activeNodeArray.length === 3
  const showPC =
    activeNodeArray[0] === 'Eigenschaften-Sammlungen' &&
    activeNodeArray[1] &&
    activeNodeArray.length === 2
  const showPCO =
    activeNodeArray[0] === 'Eigenschaften-Sammlungen' &&
    activeNodeArray[1] &&
    activeNodeArray.length === 3 &&
    activeNodeArray[2] === 'Eigenschaften'
  const showRCO =
    activeNodeArray[0] === 'Eigenschaften-Sammlungen' &&
    activeNodeArray[1] &&
    activeNodeArray.length === 3 &&
    activeNodeArray[2] === 'Beziehungen'
  const showBenutzer =
    activeNodeArray[0] === 'Benutzer' && activeNodeArray.length === 2
  const showOrganization =
    activeNodeArray[0] === 'Organisationen' && activeNodeArray.length === 2

  if (showTaxonomy) return <Taxonomy />
  if (showObjekt) return <Objekt />
  if (showPC) return <PropertyCollection />
  if (showPCO) return <PCO dimensions={dimensions} />
  if (showRCO) return <RCO dimensions={dimensions} />
  if (showBenutzer) return <Benutzer />
  if (showOrganization) return <Organisation />
  return null
}

export default enhance(DataType)
