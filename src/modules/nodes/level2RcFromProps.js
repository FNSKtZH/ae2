// @flow
export default ({
  store,
  props,
}: {
  store: Object,
  props: Object,
}): Array<Object> => {
  if (!props) return []
  if (!props.relationCollectionByDataType) return []
  if (!props.relationCollectionByDataType.nodes) return []

  return props.relationCollectionByDataType.nodes.map(node => {
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
