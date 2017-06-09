// @flow
import get from 'lodash/get'

export default (store: Object, props: Object): Array<Object> => {
  if (!props) return []
  if (!props.allPropertyCollections) return []
  if (!props.allPropertyCollections.nodes) return []

  return props.allPropertyCollections.nodes.map(node => {
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
