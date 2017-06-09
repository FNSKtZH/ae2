// @flow
export default (store: Object, props: Object): Array<Object> => {
  if (!props) return []
  if (!props.taxonomyObjectById) return []
  if (!props.taxonomyObjectById.taxonomyObjectsByParentId) return []
  if (!props.taxonomyObjectById.taxonomyObjectsByParentId.nodes) return []

  return props.taxonomyObjectById.taxonomyObjectsByParentId.nodes.map(
    level9 => {
      const childrenCount = level9.taxonomyObjectsByParentId.totalCount
      const labelCount = childrenCount > 0 ? ` (${childrenCount})` : ''
      if (store.activeNodeArray[9] === level9.id) {
        store.tree.setActiveLevel10Taxonomy(level9)
      }

      return {
        id: level9.id,
        url: [
          store.tree.activeDataType,
          store.tree.activeCategory.name,
          store.tree.activeTaxonomy.id,
          store.tree.activeLevel4Taxonomy.id,
          store.tree.activeLevel5Taxonomy.id,
          store.tree.activeLevel6Taxonomy.id,
          store.tree.activeLevel7Taxonomy.id,
          store.tree.activeLevel8Taxonomy.id,
          store.tree.activeLevel9Taxonomy.id,
          level9.id,
        ],
        sort: [
          store.tree.activeDataType,
          store.tree.activeCategory.name,
          store.tree.activeTaxonomy.name,
          store.tree.activeLevel4Taxonomy.name,
          store.tree.activeLevel5Taxonomy.name,
          store.tree.activeLevel6Taxonomy.name,
          store.tree.activeLevel7Taxonomy.name,
          store.tree.activeLevel8Taxonomy.name,
          store.tree.activeLevel9Taxonomy.name,
          level9.name,
        ],
        label: `${level9.name}${labelCount}`,
        childrenCount,
      }
    }
  )
}
