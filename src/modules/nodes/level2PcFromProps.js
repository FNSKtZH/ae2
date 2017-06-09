// @flow
export default (store: Object, props: Object): Array<Object> => {
  if (!props) return []
  if (!props.allPropertyCollections) return []
  if (!props.allPropertyCollections.nodes) return []

  return props.allPropertyCollections.nodes.map(pc => {
    return {
      id: pc.id,
      url: [store.tree.activeDataType, pc.id],
      sort: [store.tree.activeDataType, pc.name],
      label: `${pc.name}: ${pc.propertyCollectionObjectsByPropertyCollectionId
        .totalCount} Objekte`,
      childrenCount: 0,
    }
  })
}
