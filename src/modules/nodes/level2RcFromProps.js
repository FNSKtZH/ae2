// @flow
export default (store: Object, props: Object): Array<Object> => {
  if (!props) return []
  if (!props.allRelationCollections) return []
  if (!props.allRelationCollections.nodes) return []

  return props.allRelationCollections.nodes.map(node => {
    return {
      id: node.id,
      url: ['Beziehungs-Sammlungen', node.id],
      sort: [3, node.name],
      label: `${node.name}: ${node
        .relationCollectionObjectsByRelationCollectionId
        .totalCount} Objekte mit Beziehungen`,
      childrenCount: 0,
    }
  })
}
