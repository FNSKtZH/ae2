// @flow
export default (store: Object, props: Object): Array<Object> => {
  if (!props) return []
  if (!props.allRelationCollections) return []
  if (!props.allRelationCollections.nodes) return []

  return props.allRelationCollections.nodes.map(node => {
    return {
      id: node.id,
      url: [store.tree.activeLevel1.name, node.id],
      sort: [store.tree.activeLevel1.sort, node.name],
      label: `${node.name}: ${node
        .relationCollectionObjectsByRelationCollectionId
        .totalCount} Objekte mit Beziehungen`,
      childrenCount: 0,
    }
  })
}
