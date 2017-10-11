// @flow
/**
 * gets data from AppQuery
 * returns nodes
 */
import get from 'lodash/get'

import level1FromProps from './nodes/level1FromProps'
import level2PcFromProps from './nodes/level2PcFromProps'
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
  store,
  data,
}: {
  store: Object,
  data: Object,
}): Array<Object> => {
  const activeLevel2TaxonomyNodes = get(data, 'level2Taxonomy.nodes')
  const activeLevel2Taxonomy =
    activeLevel2TaxonomyNodes &&
    activeLevel2TaxonomyNodes.find(n => n.name === store.activeNodeArray[1])
  const activeLevel2TaxonomyName =
    activeLevel2Taxonomy && activeLevel2Taxonomy.name
  const activeLevel3TaxonomyNodes = get(data, 'level3Taxonomy.nodes')
  const activeLevel3Taxonomy =
    activeLevel3TaxonomyNodes &&
    activeLevel3TaxonomyNodes.find(n => n.id === store.activeNodeArray[2])
  const activeLevel3TaxonomyName =
    activeLevel3Taxonomy && activeLevel3Taxonomy.name
  const activeLevel3TaxonomyId = activeLevel3Taxonomy && activeLevel3Taxonomy.id
  const activeLevel4TaxonomyNodes = get(
    data,
    'level4Taxonomy.objectLevel1.nodes'
  )
  const activeLevel4Taxonomy =
    activeLevel4TaxonomyNodes &&
    activeLevel4TaxonomyNodes.find(n => n.id === store.activeNodeArray[3])
  const activeLevel4TaxonomyName =
    activeLevel4Taxonomy && activeLevel4Taxonomy.name
  const activeLevel4TaxonomyId = activeLevel4Taxonomy && activeLevel4Taxonomy.id
  const activeLevel5TaxonomyNodes = get(
    data,
    'level5Taxonomy.objectsByParentId.nodes'
  )
  const activeLevel5Taxonomy =
    activeLevel5TaxonomyNodes &&
    activeLevel5TaxonomyNodes.find(n => n.id === store.activeNodeArray[4])
  const activeLevel5TaxonomyName =
    activeLevel5Taxonomy && activeLevel5Taxonomy.name
  const activeLevel5TaxonomyId = activeLevel5Taxonomy && activeLevel5Taxonomy.id
  const activeLevel6TaxonomyNodes = get(
    data,
    'level6Taxonomy.objectsByParentId.nodes'
  )
  const activeLevel6Taxonomy =
    activeLevel6TaxonomyNodes &&
    activeLevel6TaxonomyNodes.find(n => n.id === store.activeNodeArray[5])
  const activeLevel6TaxonomyName =
    activeLevel6Taxonomy && activeLevel6Taxonomy.name
  const activeLevel6TaxonomyId = activeLevel6Taxonomy && activeLevel6Taxonomy.id
  const activeLevel7TaxonomyNodes = get(
    data,
    'level7Taxonomy.objectsByParentId.nodes'
  )
  const activeLevel7Taxonomy =
    activeLevel7TaxonomyNodes &&
    activeLevel7TaxonomyNodes.find(n => n.id === store.activeNodeArray[6])
  const activeLevel7TaxonomyName =
    activeLevel7Taxonomy && activeLevel7Taxonomy.name
  const activeLevel7TaxonomyId = activeLevel7Taxonomy && activeLevel7Taxonomy.id
  const activeLevel8TaxonomyNodes = get(
    data,
    'level8Taxonomy.objectsByParentId.nodes'
  )
  const activeLevel8Taxonomy =
    activeLevel8TaxonomyNodes &&
    activeLevel8TaxonomyNodes.find(n => n.id === store.activeNodeArray[7])
  const activeLevel8TaxonomyName =
    activeLevel8Taxonomy && activeLevel8Taxonomy.name
  const activeLevel8TaxonomyId = activeLevel8Taxonomy && activeLevel8Taxonomy.id
  const activeLevel9TaxonomyNodes = get(
    data,
    'level9Taxonomy.objectsByParentId.nodes'
  )
  const activeLevel9Taxonomy =
    activeLevel9TaxonomyNodes &&
    activeLevel9TaxonomyNodes.find(n => n.id === store.activeNodeArray[8])
  const activeLevel9TaxonomyName =
    activeLevel9Taxonomy && activeLevel9Taxonomy.name
  const activeLevel9TaxonomyId = activeLevel9Taxonomy && activeLevel9Taxonomy.id
  let nodes = level1FromProps(data)
  if (store.activeNodeArray.length > 0) {
    switch (store.activeNodeArray[0]) {
      case 'Eigenschaften-Sammlungen': {
        nodes = nodes.concat(
          level2PcFromProps({
            data,
          })
        )
        break
      }
      default:
      case 'Taxonomien': {
        nodes = nodes.concat(level2TaxonomyFromProps({ data }))
        break
      }
    }
  }
  if (
    store.activeNodeArray.length > 1 &&
    store.activeNodeArray[0] === 'Taxonomien'
  ) {
    nodes = nodes.concat(
      level3TaxonomyFromProps({
        data,
        activeLevel2TaxonomyName,
      })
    )
  }
  if (store.activeNodeArray.length > 2) {
    nodes = nodes.concat(
      level4TaxonomyFromProps({
        data,
        activeLevel2TaxonomyName,
        activeLevel3TaxonomyName,
        activeLevel3TaxonomyId,
      })
    )
  }
  if (store.activeNodeArray.length > 3) {
    nodes = nodes.concat(
      level5TaxonomyFromProps({
        data,
        activeLevel2TaxonomyName,
        activeLevel3TaxonomyName,
        activeLevel3TaxonomyId,
        activeLevel4TaxonomyName,
        activeLevel4TaxonomyId,
      })
    )
  }
  if (store.activeNodeArray.length > 4) {
    nodes = nodes.concat(
      level6TaxonomyFromProps({
        data,
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
  if (store.activeNodeArray.length > 5) {
    nodes = nodes.concat(
      level7TaxonomyFromProps({
        data,
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
  if (store.activeNodeArray.length > 6) {
    nodes = nodes.concat(
      level8TaxonomyFromProps({
        data,
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
  if (store.activeNodeArray.length > 7) {
    nodes = nodes.concat(
      level9TaxonomyFromProps({
        data,
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
  if (store.activeNodeArray.length > 8) {
    nodes = nodes.concat(
      level10TaxonomyFromProps({
        data,
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
  nodes = sort(nodes)
  //store.setNodes(nodes)
  return nodes
}
