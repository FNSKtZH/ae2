// @flow
export default (store: Object, props: Object): Array<Object> => {
  if (!props) return []
  if (!props.allPropertyCollections) return []
  if (!props.allPropertyCollections.nodes) return []

  return props.allPropertyCollections.nodes.map(node => {
    return {
      id: node.id,
      url: ['Eigenschaften-Sammlungen', node.id],
      sort: [2, node.name],
      label: `${node.name}: ${node
        .propertyCollectionObjectsByPropertyCollectionId.totalCount} Objekte`,
      childrenCount: 0,
    }
  })
}
