// @flow
export default (store: Object, props: Object): Array<Object> => {
  if (!props) return []
  if (!props.taxonomyObjectById) return []
  if (!props.taxonomyObjectById.taxonomyObjectsByParentId) return []
  if (!props.taxonomyObjectById.taxonomyObjectsByParentId.nodes) return []

  return props.taxonomyObjectById.taxonomyObjectsByParentId.nodes.map(
    level7 => {
      const childrenCount = level7.taxonomyObjectsByParentId.totalCount
      const labelCount = childrenCount > 0 ? ` (${childrenCount})` : ''
      if (store.activeNodeArray[7] === level7.id) {
        store.tree.setActiveLevel8Taxonomy(level7)
      }

      return {
        id: level7.id,
        url: [
          store.tree.activeLevel1,
          store.tree.activeLevel2Taxonomy.name,
          store.tree.activeLevel3Taxonomy.id,
          store.tree.activeLevel4Taxonomy.id,
          store.tree.activeLevel5Taxonomy.id,
          store.tree.activeLevel6Taxonomy.id,
          store.tree.activeLevel7Taxonomy.id,
          level7.id,
        ],
        sort: [
          store.tree.activeLevel1,
          store.tree.activeLevel2Taxonomy.name,
          store.tree.activeLevel3Taxonomy.name,
          store.tree.activeLevel4Taxonomy.name,
          store.tree.activeLevel5Taxonomy.name,
          store.tree.activeLevel6Taxonomy.name,
          store.tree.activeLevel7Taxonomy.name,
          level7.name,
        ],
        label: `${level7.name}${labelCount}`,
        childrenCount,
      }
    }
  )
}
