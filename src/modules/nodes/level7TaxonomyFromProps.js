// @flow
export default (store: Object, props: Object): Array<Object> => {
  if (!props) return []
  if (!props.taxonomyObjectById) return []
  if (!props.taxonomyObjectById.taxonomyObjectsByParentId) return []
  if (!props.taxonomyObjectById.taxonomyObjectsByParentId.nodes) return []

  return props.taxonomyObjectById.taxonomyObjectsByParentId.nodes.map(
    level6 => {
      const childrenCount = level6.taxonomyObjectsByParentId.totalCount
      const labelCount = childrenCount > 0 ? ` (${childrenCount})` : ''
      if (store.activeNodeArray[6] === level6.id) {
        store.tree.setActiveLevel7Taxonomy(level6)
      }

      return {
        id: level6.id,
        url: [
          store.tree.activeDataType,
          store.tree.activeCategory.name,
          store.tree.activeTaxonomy.id,
          store.tree.activeLevel4Taxonomy.id,
          store.tree.activeLevel5Taxonomy.id,
          store.tree.activeLevel6Taxonomy.id,
          level6.id,
        ],
        sort: [
          store.tree.activeDataType,
          store.tree.activeCategory.name,
          store.tree.activeTaxonomy.name,
          store.tree.activeLevel4Taxonomy.name,
          store.tree.activeLevel5Taxonomy.name,
          store.tree.activeLevel6Taxonomy.name,
          level6.name,
        ],
        label: `${level6.name}${labelCount}`,
        childrenCount,
      }
    }
  )
}
