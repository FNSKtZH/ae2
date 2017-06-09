// @flow
export default (store: Object, props: Object): Array<Object> => {
  if (!props) return []
  if (!props.taxonomyById) return []
  if (!props.taxonomyById.taxonomyObjectLevel1) return []
  if (!props.taxonomyById.taxonomyObjectLevel1.nodes) return []

  return props.taxonomyById.taxonomyObjectLevel1.nodes.map(node => {
    const childrenCount = node.taxonomyObjectsByParentId.totalCount
    const labelCount = childrenCount > 0 ? ` (${childrenCount})` : ''
    if (store.activeNodeArray[3] === node.id) {
      store.tree.setActiveLevel4Taxonomy(node)
    }

    return {
      id: node.id,
      url: [
        store.tree.activeLevel1,
        store.tree.activeLevel2Taxonomy.name,
        store.tree.activeLevel3Taxonomy.id,
        node.id,
      ],
      sort: [
        store.tree.activeLevel1,
        store.tree.activeLevel2Taxonomy.name,
        store.tree.activeLevel3Taxonomy.name,
        node.name,
      ],
      label: `${node.name}${labelCount}`,
      childrenCount,
    }
  })
}
