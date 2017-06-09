// @flow
export default (store: Object, props: Object): Array<Object> => {
  if (!props) return []
  if (!props.taxonomyObjectById) return []
  if (!props.taxonomyObjectById.taxonomyObjectsByParentId) return []
  if (!props.taxonomyObjectById.taxonomyObjectsByParentId.nodes) return []

  return props.taxonomyObjectById.taxonomyObjectsByParentId.nodes.map(node => {
    const childrenCount = node.taxonomyObjectsByParentId.totalCount
    const labelCount = childrenCount > 0 ? ` (${childrenCount})` : ''
    if (store.activeNodeArray[9] === node.id) {
      store.tree.setActiveLevel10Taxonomy(node)
    }

    return {
      id: node.id,
      url: [
        'Taxonomien',
        store.tree.activeLevel2Taxonomy.name,
        store.tree.activeLevel3Taxonomy.id,
        store.tree.activeLevel4Taxonomy.id,
        store.tree.activeLevel5Taxonomy.id,
        store.tree.activeLevel6Taxonomy.id,
        store.tree.activeLevel7Taxonomy.id,
        store.tree.activeLevel8Taxonomy.id,
        store.tree.activeLevel9Taxonomy.id,
        node.id,
      ],
      sort: [
        1,
        store.tree.activeLevel2Taxonomy.name,
        store.tree.activeLevel3Taxonomy.name,
        store.tree.activeLevel4Taxonomy.name,
        store.tree.activeLevel5Taxonomy.name,
        store.tree.activeLevel6Taxonomy.name,
        store.tree.activeLevel7Taxonomy.name,
        store.tree.activeLevel8Taxonomy.name,
        store.tree.activeLevel9Taxonomy.name,
        node.name,
      ],
      label: `${node.name}${labelCount}`,
      childrenCount,
    }
  })
}
