// @flow
/**
 * gets data from AppQuery
 * returns nodes
 */
import get from 'lodash/get'

import level1 from './nodes/level1'
import level2Benutzer from './nodes/level2Benutzer'
import level2Organization from './nodes/level2Organization'
import level2Pc from './nodes/level2Pc'
import level3Pc from './nodes/level3Pc'
import level2Taxonomy from './nodes/level2Taxonomy'
import level3Object from './nodes/level3Object'
import level4Object from './nodes/level4Object'
import level5Object from './nodes/level5Object'
import level6Object from './nodes/level6Object'
import level7Object from './nodes/level7Object'
import level8Object from './nodes/level8Object'
import level9Object from './nodes/level9Object'
import level10Object from './nodes/level10Object'
import sort from './nodes/sort'

export default ({
  treeData,
  activeNodeArray,
}: {
  treeData: Object,
  activeNodeArray: Object,
}): Array<Object> => {
  const activeLevel2TaxonomyNodes = activeNodeArray[0]
    ? get(treeData, 'allTaxonomies.nodes', []).filter(n => {
        if (activeNodeArray[0] === 'Arten') return n.type === 'ART'
        return n.type === 'LEBENSRAUM'
      })
    : null
  const activeLevel2Taxonomy =
    activeLevel2TaxonomyNodes &&
    activeLevel2TaxonomyNodes.find(n => n.id === activeNodeArray[1])
  const activeLevel2TaxonomyName =
    activeLevel2Taxonomy && activeLevel2Taxonomy.name
  const activeLevel3ObjectNodes = get(treeData, 'taxonomyObjectLevel1.nodes')
  const activeLevel3Object =
    activeLevel3ObjectNodes &&
    activeLevel3ObjectNodes.find(n => n.id === activeNodeArray[2])
  const activeLevel3ObjectName = activeLevel3Object && activeLevel3Object.name
  const activeLevel3ObjectId = activeLevel3Object && activeLevel3Object.id
  const activeLevel4ObjectNodes = get(
    treeData,
    'level4Object.objectsByParentId.nodes'
  )
  const activeLevel4Object =
    activeLevel4ObjectNodes &&
    activeLevel4ObjectNodes.find(n => n.id === activeNodeArray[3])
  const activeLevel4ObjectName = activeLevel4Object && activeLevel4Object.name
  const activeLevel4ObjectId = activeLevel4Object && activeLevel4Object.id

  const activeLevel5ObjectNodes = get(
    treeData,
    'level5Object.objectsByParentId.nodes'
  )
  const activeLevel5Object =
    activeLevel5ObjectNodes &&
    activeLevel5ObjectNodes.find(n => n.id === activeNodeArray[4])
  const activeLevel5ObjectName = activeLevel5Object && activeLevel5Object.name
  const activeLevel5ObjectId = activeLevel5Object && activeLevel5Object.id
  const activeLevel6ObjectNodes = get(
    treeData,
    'level6Object.objectsByParentId.nodes'
  )
  const activeLevel6Object =
    activeLevel6ObjectNodes &&
    activeLevel6ObjectNodes.find(n => n.id === activeNodeArray[5])
  const activeLevel6ObjectName = activeLevel6Object && activeLevel6Object.name
  const activeLevel6ObjectId = activeLevel6Object && activeLevel6Object.id
  const activeLevel7ObjectNodes = get(
    treeData,
    'level7Object.objectsByParentId.nodes'
  )
  const activeLevel7Object =
    activeLevel7ObjectNodes &&
    activeLevel7ObjectNodes.find(n => n.id === activeNodeArray[6])
  const activeLevel7ObjectName = activeLevel7Object && activeLevel7Object.name
  const activeLevel7ObjectId = activeLevel7Object && activeLevel7Object.id
  const activeLevel8ObjectNodes = get(
    treeData,
    'level8Object.objectsByParentId.nodes'
  )
  const activeLevel8Object =
    activeLevel8ObjectNodes &&
    activeLevel8ObjectNodes.find(n => n.id === activeNodeArray[7])
  const activeLevel8ObjectName = activeLevel8Object && activeLevel8Object.name
  const activeLevel8ObjectId = activeLevel8Object && activeLevel8Object.id
  const activeLevel9ObjectNodes = get(
    treeData,
    'level9Object.objectsByParentId.nodes'
  )
  const activeLevel9Object =
    activeLevel9ObjectNodes &&
    activeLevel9ObjectNodes.find(n => n.id === activeNodeArray[8])
  const activeLevel9ObjectName = activeLevel9Object && activeLevel9Object.name
  const activeLevel9ObjectId = activeLevel9Object && activeLevel9Object.id
  let nodes = level1({
    treeData,
    activeNodeArray,
  })
  if (activeNodeArray.length > 0) {
    switch (activeNodeArray[0]) {
      case 'Eigenschaften-Sammlungen': {
        nodes = [
          ...nodes,
          ...level2Pc({ treeData }),
        ]
        break
      }
      case 'Benutzer': {
        const token = get(treeData, 'login.token')
        if (!!token) {
          nodes = [
            ...nodes,
            ...level2Benutzer({ treeData }),
          ]
        }
        break
      }
      case 'Organisationen': {
        nodes = [
          ...nodes,
          ...level2Organization({ treeData }),
        ]
        break
      }
      default:
      case 'Arten':
      case 'Lebensräume': {
        nodes = [
          ...nodes,
          ...level2Taxonomy({ treeData, activeNodeArray }),
        ]
        break
      }
    }
  }
  if (
    activeNodeArray.length > 1 &&
    activeNodeArray[0] === 'Eigenschaften-Sammlungen'
  ) {
    nodes = nodes.concat(
      level3Pc({
        treeData,
      })
    )
  }
  if (
    activeNodeArray.length > 1 &&
    activeNodeArray[0] === 'Benutzer'
  ) {
    // TODO
  }
  if (
    activeNodeArray.length > 1 &&
    ['Arten', 'Lebensräume'].includes(activeNodeArray[0])
  ) {
    nodes = nodes.concat(
      level3Object({
        treeData,
        activeLevel2TaxonomyName,
      })
    )
  }
  if (
    activeNodeArray.length > 2 &&
    ['Arten', 'Lebensräume'].includes(activeNodeArray[0])
  ) {
    nodes = nodes.concat(
      level4Object({
        treeData,
        activeLevel2TaxonomyName,
        activeLevel3ObjectName,
        activeLevel3ObjectId,
      })
    )
  }
  if (
    activeNodeArray.length > 3 &&
    ['Arten', 'Lebensräume'].includes(activeNodeArray[0])
  ) {
    nodes = nodes.concat(
      level5Object({
        treeData,
        activeLevel2TaxonomyName,
        activeLevel3ObjectName,
        activeLevel3ObjectId,
        activeLevel4ObjectName,
        activeLevel4ObjectId,
      })
    )
  }
  if (
    activeNodeArray.length > 4 &&
    ['Arten', 'Lebensräume'].includes(activeNodeArray[0])
  ) {
    nodes = nodes.concat(
      level6Object({
        treeData,
        activeLevel2TaxonomyName,
        activeLevel3ObjectName,
        activeLevel3ObjectId,
        activeLevel4ObjectName,
        activeLevel4ObjectId,
        activeLevel5ObjectName,
        activeLevel5ObjectId,
      })
    )
  }
  if (
    activeNodeArray.length > 5 &&
    ['Arten', 'Lebensräume'].includes(activeNodeArray[0])
  ) {
    nodes = nodes.concat(
      level7Object({
        treeData,
        activeLevel2TaxonomyName,
        activeLevel3ObjectName,
        activeLevel3ObjectId,
        activeLevel4ObjectName,
        activeLevel4ObjectId,
        activeLevel5ObjectName,
        activeLevel5ObjectId,
        activeLevel6ObjectName,
        activeLevel6ObjectId,
      })
    )
  }
  if (
    activeNodeArray.length > 6 &&
    ['Arten', 'Lebensräume'].includes(activeNodeArray[0])
  ) {
    nodes = nodes.concat(
      level8Object({
        treeData,
        activeLevel2TaxonomyName,
        activeLevel3ObjectName,
        activeLevel3ObjectId,
        activeLevel4ObjectName,
        activeLevel4ObjectId,
        activeLevel5ObjectName,
        activeLevel5ObjectId,
        activeLevel6ObjectName,
        activeLevel6ObjectId,
        activeLevel7ObjectName,
        activeLevel7ObjectId,
      })
    )
  }
  if (
    activeNodeArray.length > 7 &&
    ['Arten', 'Lebensräume'].includes(activeNodeArray[0])
  ) {
    nodes = nodes.concat(
      level9Object({
        treeData,
        activeLevel2TaxonomyName,
        activeLevel3ObjectName,
        activeLevel3ObjectId,
        activeLevel4ObjectName,
        activeLevel4ObjectId,
        activeLevel5ObjectName,
        activeLevel5ObjectId,
        activeLevel6ObjectName,
        activeLevel6ObjectId,
        activeLevel7ObjectName,
        activeLevel7ObjectId,
        activeLevel8ObjectName,
        activeLevel8ObjectId,
      })
    )
  }
  if (
    activeNodeArray.length > 8 &&
    ['Arten', 'Lebensräume'].includes(activeNodeArray[0])
  ) {
    nodes = nodes.concat(
      level10Object({
        treeData,
        activeLevel2TaxonomyName,
        activeLevel3ObjectName,
        activeLevel3ObjectId,
        activeLevel4ObjectName,
        activeLevel4ObjectId,
        activeLevel5ObjectName,
        activeLevel5ObjectId,
        activeLevel6ObjectName,
        activeLevel6ObjectId,
        activeLevel7ObjectName,
        activeLevel7ObjectId,
        activeLevel8ObjectName,
        activeLevel8ObjectId,
        activeLevel9ObjectName,
        activeLevel9ObjectId,
      })
    )
  }
  return sort(nodes)
}
