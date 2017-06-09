// @flow
export default (store: Object, props: Object): Array<Object> => {
  if (!props) return []
  if (!props.allPropertyCollections) return []
  if (!props.allPropertyCollections.nodes) return []

  return props.allPropertyCollections.nodes.map(node => {
    return {
      id: node.id,
      url: [store.tree.activeLevel1, node.id],
      sort: [store.tree.activeLevel1, node.name],
      label: `${node.name}: ${node
        .propertyCollectionObjectsByPropertyCollectionId.totalCount} Objekte`,
      childrenCount: 0,
    }
  })
}
