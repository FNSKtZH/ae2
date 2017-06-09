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
        store.tree.setActiveLevel8(level7)
      }

      return {
        id: level7.id,
        url: [
          store.tree.activeDataType,
          store.tree.activeCategory.name,
          store.tree.activeTaxonomy.id,
          store.tree.activeLevel4.id,
          store.tree.activeLevel5.id,
          store.tree.activeLevel6.id,
          store.tree.activeLevel7.id,
          level7.id,
        ],
        sort: [
          store.tree.activeDataType,
          store.tree.activeCategory.name,
          store.tree.activeTaxonomy.name,
          store.tree.activeLevel4.name,
          store.tree.activeLevel5.name,
          store.tree.activeLevel6.name,
          store.tree.activeLevel7.name,
          level7.name,
        ],
        label: `${level7.name}${labelCount}`,
        childrenCount,
      }
    }
  )
}
