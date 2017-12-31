// @flow
/**
 * gets data from AppQuery
 * returns nodes
 */
import get from 'lodash/get'

import level1FromProps from './nodes/level1FromProps'
import level2PcFromProps from './nodes/level2PcFromProps'
import level3PcFromProps from './nodes/level3PcFromProps'
import level2TaxonomyFromProps from './nodes/level2TaxonomyFromProps'
import level3TaxonomyFromProps from './nodes/level3TaxonomyFromProps'
import level4TaxonomyFromProps from './nodes/level4TaxonomyFromProps'
import level5TaxonomyFromProps from './nodes/level5TaxonomyFromProps'
import level6TaxonomyFromProps from './nodes/level6TaxonomyFromProps'
import level7TaxonomyFromProps from './nodes/level7TaxonomyFromProps'
import level8TaxonomyFromProps from './nodes/level8TaxonomyFromProps'
import level9TaxonomyFromProps from './nodes/level9TaxonomyFromProps'
import level10TaxonomyFromProps from './nodes/level10TaxonomyFromProps'
import sort from './nodes/sort'

export default ({
  treeData,
  allCategoriesData,
  activeNodeArray,
}: {
  treeData: Object,
  allCategoriesData: Object,
  activeNodeArray: Object,
}): Array<Object> => {
  const activeLevel2TaxonomyNodes = get(treeData, 'level2Taxonomy.nodes')
  const activeLevel2Taxonomy =
    activeLevel2TaxonomyNodes &&
    activeLevel2TaxonomyNodes.find(n => n.name === activeNodeArray[1])
  const activeLevel2TaxonomyName =
    activeLevel2Taxonomy && activeLevel2Taxonomy.name
  const activeLevel3TaxonomyNodes = get(treeData, 'level3Taxonomy.nodes')
  const activeLevel3Taxonomy =
    activeLevel3TaxonomyNodes &&
    activeLevel3TaxonomyNodes.find(n => n.id === activeNodeArray[2])
  const activeLevel3TaxonomyName =
    activeLevel3Taxonomy && activeLevel3Taxonomy.name
  const activeLevel3TaxonomyId = activeLevel3Taxonomy && activeLevel3Taxonomy.id
  const activeLevel4TaxonomyNodes = get(
    treeData,
    'level4Taxonomy.objectLevel1.nodes'
  )
  const activeLevel4Taxonomy =
    activeLevel4TaxonomyNodes &&
    activeLevel4TaxonomyNodes.find(n => n.id === activeNodeArray[3])
  const activeLevel4TaxonomyName =
    activeLevel4Taxonomy && activeLevel4Taxonomy.name
  const activeLevel4TaxonomyId = activeLevel4Taxonomy && activeLevel4Taxonomy.id
  const activeLevel5TaxonomyNodes = get(
    treeData,
    'level5Taxonomy.objectsByParentId.nodes'
  )
  const activeLevel5Taxonomy =
    activeLevel5TaxonomyNodes &&
    activeLevel5TaxonomyNodes.find(n => n.id === activeNodeArray[4])
  const activeLevel5TaxonomyName =
    activeLevel5Taxonomy && activeLevel5Taxonomy.name
  const activeLevel5TaxonomyId = activeLevel5Taxonomy && activeLevel5Taxonomy.id
  const activeLevel6TaxonomyNodes = get(
    treeData,
    'level6Taxonomy.objectsByParentId.nodes'
  )
  const activeLevel6Taxonomy =
    activeLevel6TaxonomyNodes &&
    activeLevel6TaxonomyNodes.find(n => n.id === activeNodeArray[5])
  const activeLevel6TaxonomyName =
    activeLevel6Taxonomy && activeLevel6Taxonomy.name
  const activeLevel6TaxonomyId = activeLevel6Taxonomy && activeLevel6Taxonomy.id
  const activeLevel7TaxonomyNodes = get(
    treeData,
    'level7Taxonomy.objectsByParentId.nodes'
  )
  const activeLevel7Taxonomy =
    activeLevel7TaxonomyNodes &&
    activeLevel7TaxonomyNodes.find(n => n.id === activeNodeArray[6])
  const activeLevel7TaxonomyName =
    activeLevel7Taxonomy && activeLevel7Taxonomy.name
  const activeLevel7TaxonomyId = activeLevel7Taxonomy && activeLevel7Taxonomy.id
  const activeLevel8TaxonomyNodes = get(
    treeData,
    'level8Taxonomy.objectsByParentId.nodes'
  )
  const activeLevel8Taxonomy =
    activeLevel8TaxonomyNodes &&
    activeLevel8TaxonomyNodes.find(n => n.id === activeNodeArray[7])
  const activeLevel8TaxonomyName =
    activeLevel8Taxonomy && activeLevel8Taxonomy.name
  const activeLevel8TaxonomyId = activeLevel8Taxonomy && activeLevel8Taxonomy.id
  const activeLevel9TaxonomyNodes = get(
    treeData,
    'level9Taxonomy.objectsByParentId.nodes'
  )
  const activeLevel9Taxonomy =
    activeLevel9TaxonomyNodes &&
    activeLevel9TaxonomyNodes.find(n => n.id === activeNodeArray[8])
  const activeLevel9TaxonomyName =
    activeLevel9Taxonomy && activeLevel9Taxonomy.name
  const activeLevel9TaxonomyId = activeLevel9Taxonomy && activeLevel9Taxonomy.id
  let nodes = level1FromProps({ treeData, allCategoriesData })
  if (activeNodeArray.length > 0) {
    switch (activeNodeArray[0]) {
      case 'Eigenschaften-Sammlungen': {
        nodes = nodes.concat(
          level2PcFromProps({
            treeData,
          })
        )
        break
      }
      default:
      case 'Taxonomien': {
        nodes = nodes.concat(level2TaxonomyFromProps({ treeData }))
        break
      }
    }
  }
  if (
    activeNodeArray.length > 1 &&
    activeNodeArray[0] === 'Eigenschaften-Sammlungen'
  ) {
    nodes = nodes.concat(
      level3PcFromProps({
        treeData,
      })
    )
  }
  if (activeNodeArray.length > 1 && activeNodeArray[0] === 'Taxonomien') {
    nodes = nodes.concat(
      level3TaxonomyFromProps({
        treeData,
        activeLevel2TaxonomyName,
      })
    )
  }
  if (activeNodeArray.length > 2 && activeNodeArray[0] === 'Taxonomien') {
    nodes = nodes.concat(
      level4TaxonomyFromProps({
        treeData,
        activeLevel2TaxonomyName,
        activeLevel3TaxonomyName,
        activeLevel3TaxonomyId,
      })
    )
  }
  if (activeNodeArray.length > 3 && activeNodeArray[0] === 'Taxonomien') {
    nodes = nodes.concat(
      level5TaxonomyFromProps({
        treeData,
        activeLevel2TaxonomyName,
        activeLevel3TaxonomyName,
        activeLevel3TaxonomyId,
        activeLevel4TaxonomyName,
        activeLevel4TaxonomyId,
      })
    )
  }
  if (activeNodeArray.length > 4 && activeNodeArray[0] === 'Taxonomien') {
    nodes = nodes.concat(
      level6TaxonomyFromProps({
        treeData,
        activeLevel2TaxonomyName,
        activeLevel3TaxonomyName,
        activeLevel3TaxonomyId,
        activeLevel4TaxonomyName,
        activeLevel4TaxonomyId,
        activeLevel5TaxonomyName,
        activeLevel5TaxonomyId,
      })
    )
  }
  if (activeNodeArray.length > 5 && activeNodeArray[0] === 'Taxonomien') {
    nodes = nodes.concat(
      level7TaxonomyFromProps({
        treeData,
        activeLevel2TaxonomyName,
        activeLevel3TaxonomyName,
        activeLevel3TaxonomyId,
        activeLevel4TaxonomyName,
        activeLevel4TaxonomyId,
        activeLevel5TaxonomyName,
        activeLevel5TaxonomyId,
        activeLevel6TaxonomyName,
        activeLevel6TaxonomyId,
      })
    )
  }
  if (activeNodeArray.length > 6 && activeNodeArray[0] === 'Taxonomien') {
    nodes = nodes.concat(
      level8TaxonomyFromProps({
        treeData,
        activeLevel2TaxonomyName,
        activeLevel3TaxonomyName,
        activeLevel3TaxonomyId,
        activeLevel4TaxonomyName,
        activeLevel4TaxonomyId,
        activeLevel5TaxonomyName,
        activeLevel5TaxonomyId,
        activeLevel6TaxonomyName,
        activeLevel6TaxonomyId,
        activeLevel7TaxonomyName,
        activeLevel7TaxonomyId,
      })
    )
  }
  if (activeNodeArray.length > 7 && activeNodeArray[0] === 'Taxonomien') {
    nodes = nodes.concat(
      level9TaxonomyFromProps({
        treeData,
        activeLevel2TaxonomyName,
        activeLevel3TaxonomyName,
        activeLevel3TaxonomyId,
        activeLevel4TaxonomyName,
        activeLevel4TaxonomyId,
        activeLevel5TaxonomyName,
        activeLevel5TaxonomyId,
        activeLevel6TaxonomyName,
        activeLevel6TaxonomyId,
        activeLevel7TaxonomyName,
        activeLevel7TaxonomyId,
        activeLevel8TaxonomyName,
        activeLevel8TaxonomyId,
      })
    )
  }
  if (activeNodeArray.length > 8 && activeNodeArray[0] === 'Taxonomien') {
    nodes = nodes.concat(
      level10TaxonomyFromProps({
        treeData,
        activeLevel2TaxonomyName,
        activeLevel3TaxonomyName,
        activeLevel3TaxonomyId,
        activeLevel4TaxonomyName,
        activeLevel4TaxonomyId,
        activeLevel5TaxonomyName,
        activeLevel5TaxonomyId,
        activeLevel6TaxonomyName,
        activeLevel6TaxonomyId,
        activeLevel7TaxonomyName,
        activeLevel7TaxonomyId,
        activeLevel8TaxonomyName,
        activeLevel8TaxonomyId,
        activeLevel9TaxonomyName,
        activeLevel9TaxonomyId,
      })
    )
  }
  return sort(nodes)
}
