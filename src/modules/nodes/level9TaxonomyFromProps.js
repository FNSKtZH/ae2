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
        store.tree.setActiveLevel9(level8)
      }

      return {
        id: level8.id,
        url: [
          store.tree.activeDataType,
          store.tree.activeCategory.name,
          store.tree.activeTaxonomy.id,
          store.tree.activeLevel4.id,
          store.tree.activeLevel5.id,
          store.tree.activeLevel6.id,
          store.tree.activeLevel7.id,
          store.tree.activeLevel8.id,
          level8.id,
        ],
        sort: [
          store.tree.activeDataType,
          store.tree.activeCategory.name,
          store.tree.activeTaxonomy.name,
          store.tree.activeLevel4.name,
          store.tree.activeLevel5.name,
          store.tree.activeLevel6.name,
          store.tree.activeLevel7.name,
          store.tree.activeLevel8.name,
          level8.name,
        ],
        label: `${level8.name}${labelCount}`,
        childrenCount,
      }
    }
  )
}
