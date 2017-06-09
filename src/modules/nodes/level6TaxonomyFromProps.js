// @flow
export default (store: Object, props: Object): Array<Object> => {
  if (!props) return []
  if (!props.taxonomyObjectById) return []
  if (!props.taxonomyObjectById.taxonomyObjectsByParentId) return []
  if (!props.taxonomyObjectById.taxonomyObjectsByParentId.nodes) return []

  return props.taxonomyObjectById.taxonomyObjectsByParentId.nodes.map(node => {
    const childrenCount = node.taxonomyObjectsByParentId.totalCount
    const labelCount = childrenCount > 0 ? ` (${childrenCount})` : ''
    if (store.activeNodeArray[5] === node.id) {
      store.tree.setActiveLevel6Taxonomy(node)
    }

    return {
      id: node.id,
      url: [
        store.tree.activeLevel1.name,
        store.tree.activeLevel2Taxonomy.name,
        store.tree.activeLevel3Taxonomy.id,
        store.tree.activeLevel4Taxonomy.id,
        store.tree.activeLevel5Taxonomy.id,
        node.id,
      ],
      sort: [
        store.tree.activeLevel1.sort,
        store.tree.activeLevel2Taxonomy.name,
        store.tree.activeLevel3Taxonomy.name,
        store.tree.activeLevel4Taxonomy.name,
        store.tree.activeLevel5Taxonomy.name,
        node.name,
      ],
      label: `${node.name}${labelCount}`,
      childrenCount,
    }
  })
}
