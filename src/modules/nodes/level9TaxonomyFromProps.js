// @flow
export default (store: Object, props: Object): Array<Object> => {
  if (!props) return []
  if (!props.taxonomyObjectById) return []
  if (!props.taxonomyObjectById.taxonomyObjectsByParentId) return []
  if (!props.taxonomyObjectById.taxonomyObjectsByParentId.nodes) return []

  return props.taxonomyObjectById.taxonomyObjectsByParentId.nodes.map(
    level8 => {
      const childrenCount = level8.taxonomyObjectsByParentId.totalCount
      const labelCount = childrenCount > 0 ? ` (${childrenCount})` : ''
      if (store.activeNodeArray[8] === level8.id) {
        store.tree.setActiveLevel9Taxonomy(level8)
      }

      return {
        id: level8.id,
        url: [
          store.tree.activeLevel1,
          store.tree.activeLevel2Taxonomy.name,
          store.tree.activeLevel3Taxonomy.id,
          store.tree.activeLevel4Taxonomy.id,
          store.tree.activeLevel5Taxonomy.id,
          store.tree.activeLevel6Taxonomy.id,
          store.tree.activeLevel7Taxonomy.id,
          store.tree.activeLevel8Taxonomy.id,
          level8.id,
        ],
        sort: [
          store.tree.activeLevel1,
          store.tree.activeLevel2Taxonomy.name,
          store.tree.activeLevel3Taxonomy.name,
          store.tree.activeLevel4Taxonomy.name,
          store.tree.activeLevel5Taxonomy.name,
          store.tree.activeLevel6Taxonomy.name,
          store.tree.activeLevel7Taxonomy.name,
          store.tree.activeLevel8Taxonomy.name,
          level8.name,
        ],
        label: `${level8.name}${labelCount}`,
        childrenCount,
      }
    }
  )
}
