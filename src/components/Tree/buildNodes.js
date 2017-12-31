// @flow
/**
 * gets data from AppQuery
 * returns nodes
 */
import get from 'lodash/get'

import level1 from './nodes/level1'
import level2Benutzer from './nodes/level2Benutzer'
import level2Pc from './nodes/level2Pc'
import level3Pc from './nodes/level3Pc'
import level2Taxonomy from './nodes/level2Taxonomy'
import level3Taxonomy from './nodes/level3Taxonomy'
import level4Taxonomy from './nodes/level4Taxonomy'
import level5Taxonomy from './nodes/level5Taxonomy'
import level6Taxonomy from './nodes/level6Taxonomy'
import level7Taxonomy from './nodes/level7Taxonomy'
import level8Taxonomy from './nodes/level8Taxonomy'
import level9Taxonomy from './nodes/level9Taxonomy'
import level10Taxonomy from './nodes/level10Taxonomy'
import sort from './nodes/sort'

export default ({
  treeData,
  allCategoriesData,
  activeNodeArray,
  loginData,
}: {
  treeData: Object,
  allCategoriesData: Object,
  activeNodeArray: Object,
  loginData: Object,
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
  let nodes = level1({
    treeData,
    allCategoriesData,
    activeNodeArray,
    loginData,
  })
  if (activeNodeArray.length > 0) {
    switch (activeNodeArray[0]) {
      case 'Eigenschaften-Sammlungen': {
        nodes = nodes.concat(
          level2Pc({
            treeData,
          })
        )
        break
      }
      case 'Benutzer': {
        nodes = nodes.concat(level2Benutzer({ treeData }))
        break
      }
      default:
      case 'Taxonomien': {
        nodes = nodes.concat(level2Taxonomy({ treeData }))
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
  if (activeNodeArray.length > 1 && activeNodeArray[0] === 'Taxonomien') {
    nodes = nodes.concat(
      level3Taxonomy({
        treeData,
        activeLevel2TaxonomyName,
      })
    )
  }
  if (activeNodeArray.length > 2 && activeNodeArray[0] === 'Taxonomien') {
    nodes = nodes.concat(
      level4Taxonomy({
        treeData,
        activeLevel2TaxonomyName,
        activeLevel3TaxonomyName,
        activeLevel3TaxonomyId,
      })
    )
  }
  if (activeNodeArray.length > 3 && activeNodeArray[0] === 'Taxonomien') {
    nodes = nodes.concat(
      level5Taxonomy({
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
      level6Taxonomy({
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
      level7Taxonomy({
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
      level8Taxonomy({
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
      level9Taxonomy({
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
      level10Taxonomy({
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
