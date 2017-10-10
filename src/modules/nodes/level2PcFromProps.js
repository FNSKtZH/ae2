// @flow
import get from 'lodash/get'

export default ({ data }: { data: Object }): Array<Object> => {
  if (!data) return []
  if (!data.allPropertyCollections) return []
  if (!data.allPropertyCollections.nodes) return []

  return data.allPropertyCollections.nodes.map(node => {
    const count = get(
      node,
      'propertyCollectionObjectsByPropertyCollectionId.totalCount',
      0
    )
    return {
      id: node.id,
      url: ['Eigenschaften-Sammlungen', node.id],
      sort: [2, node.name],
      label: `${node.name}: ${count} Objekte`,
      childrenCount: 0,
    }
  })
}
