import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import loadable from '@loadable/component'
import { getSnapshot } from 'mobx-state-tree'

//import LazyImportFallback from './shared/LazyImportFallback'
import mobxStoreContext from '../mobxStoreContext'

//const Pco = lazy(() => import('./PropertyCollection/PCO'))
const Pco = loadable(() => import('./PropertyCollection/PCO'))
//const Rco = lazy(() => import('./PropertyCollection/RCO'))
const Rco = loadable(() => import('./PropertyCollection/RCO'))
//const Objekt = lazy(() => import('./Objekt'))
const Objekt = loadable(() => import('./Objekt'))
//const Taxonomy = lazy(() => import('./Taxonomy'))
const Taxonomy = loadable(() => import('./Taxonomy'))
//const PropertyCollection = lazy(() => import('./PropertyCollection'))
const PropertyCollection = loadable(() => import('./PropertyCollection'))
//const Benutzer = lazy(() => import('./Benutzer'))
const Benutzer = loadable(() => import('./Benutzer'))
//const Organisation = lazy(() => import('./Organisation'))
const Organisation = loadable(() => import('./Organisation'))
const Home = loadable(() => import('./Home'))

const DataType = ({ dimensions, stacked = false }) => {
  const mobxStore = useContext(mobxStoreContext)
  const activeNodeArray = getSnapshot(mobxStore.activeNodeArray)

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

  // TODO: ReactDOMServer does not yet support Suspense
  if (showTaxonomy) return <Taxonomy />
  if (showObjekt) return <Objekt stacked={stacked} />
  if (showPC) return <PropertyCollection />
  if (showPCO) return <Pco dimensions={dimensions} />
  if (showRCO) return <Rco dimensions={dimensions} />
  if (showBenutzer) return <Benutzer />
  if (showOrganization) return <Organisation />
  return <Home />
}

export default observer(DataType)
