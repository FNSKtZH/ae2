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
        store.tree.setActiveLevel5(level4)
      }

      return {
        id: level4.id,
        url: [
          store.tree.activeDataType,
          store.tree.activeCategory.name,
          store.tree.activeTaxonomy.id,
          store.tree.activeLevel4.id,
          level4.id,
        ],
        sort: [
          store.tree.activeDataType,
          store.tree.activeCategory.name,
          store.tree.activeTaxonomy.name,
          store.tree.activeLevel4.name,
          level4.name,
        ],
        label: `${level4.name}${labelCount}`,
        childrenCount,
      }
    }
  )
}
