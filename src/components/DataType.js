// @flow
import React from 'react'
import compose from 'recompose/compose'
import get from 'lodash/get'
import Loadable from 'react-loadable'

import activeNodeArrayData from '../modules/activeNodeArrayData'
import LoadingComponent from './shared/LoadingComponent'

const Pco = Loadable({
  loader: () => import('./PropertyCollection/PCO'),
  loading: LoadingComponent,
})
const Rco = Loadable({
  loader: () => import('./PropertyCollection/RCO'),
  loading: LoadingComponent,
})
const Objekt = Loadable({
  loader: () => import('./Objekt'),
  loading: LoadingComponent,
})
const Taxonomy = Loadable({
  loader: () => import('./Taxonomy'),
  loading: LoadingComponent,
})
const PropertyCollection = Loadable({
  loader: () => import('./PropertyCollection'),
  loading: LoadingComponent,
})
const Benutzer = Loadable({
  loader: () => import('./Benutzer'),
  loading: LoadingComponent,
})
const Organisation = Loadable({
  loader: () => import('./Organisation'),
  loading: LoadingComponent,
})

const enhance = compose(activeNodeArrayData)

const DataType = ({
  activeNodeArrayData,
  dimensions,
  stacked = false,
}: {
  activeNodeArrayData: Object,
  dimensions: Object,
  stacked: Boolean,
}) => {
  const activeNodeArray = get(activeNodeArrayData, 'activeNodeArray', [])
  const showObjekt =
    ['Arten', 'Lebensräume'].includes(activeNodeArray[0]) &&
    activeNodeArray.length > 1
  const showTaxonomy =
    ['Arten', 'Lebensräume'].includes(activeNodeArray[0]) &&
    activeNodeArray.length === 2
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
  if (showObjekt) return <Objekt stacked={stacked} />
  if (showPC) return <PropertyCollection />
  if (showPCO) return <Pco dimensions={dimensions} />
  if (showRCO) return <Rco dimensions={dimensions} />
  if (showBenutzer) return <Benutzer dimensions={dimensions} />
  if (showOrganization) return <Organisation dimensions={dimensions} />
  return null
}

export default enhance(DataType)
