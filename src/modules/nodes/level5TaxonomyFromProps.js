// @flow
export default (store: Object, props: Object): Array<Object> => {
  if (!props) return []
  if (!props.taxonomyObjectById) return []
  if (!props.taxonomyObjectById.taxonomyObjectsByParentId) return []
  if (!props.taxonomyObjectById.taxonomyObjectsByParentId.nodes) return []

  return props.taxonomyObjectById.taxonomyObjectsByParentId.nodes.map(
    level4 => {
      const childrenCount = level4.taxonomyObjectsByParentId.totalCount
      const labelCount = childrenCount > 0 ? ` (${childrenCount})` : ''
      if (store.activeNodeArray[4] === level4.id) {
        store.tree.setActiveLevel5Taxonomy(level4)
      }

      return {
        id: level4.id,
        url: [
          store.tree.activeLevel1,
          store.tree.activeLevel2Taxonomy.name,
          store.tree.activeLevel3Taxonomy.id,
          store.tree.activeLevel4Taxonomy.id,
          level4.id,
        ],
        sort: [
          store.tree.activeLevel1,
          store.tree.activeLevel2Taxonomy.name,
          store.tree.activeLevel3Taxonomy.name,
          store.tree.activeLevel4Taxonomy.name,
          level4.name,
        ],
        label: `${level4.name}${labelCount}`,
        childrenCount,
      }
    }
  )
}
