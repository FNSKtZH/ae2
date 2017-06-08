// @flow
export default (store: Object, props: Object): Array<Object> => {
  console.log('taxonomyLevel10FromProps: props:', props)
  if (!props) return []
  if (!props.taxonomyObjectById) return []
  if (!props.taxonomyObjectById.taxonomyObjectsByParentId) return []
  if (!props.taxonomyObjectById.taxonomyObjectsByParentId.nodes) return []

  return props.taxonomyObjectById.taxonomyObjectsByParentId.nodes.map(
    level10 => {
      const childrenCount = level10.taxonomyObjectsByParentId.totalCount
      const labelCount = childrenCount > 0 ? ` (${childrenCount})` : ''
      if (store.activeNodeArray[10] === level10.id) {
        store.tree.setActiveLevel10(level10)
      }

      return {
        id: level10.id,
        url: [
          store.tree.activeDataType,
          store.tree.activeCategory.name,
          store.tree.activeTaxonomy.id,
          store.tree.activeLevel3.id,
          store.tree.activeLevel4.id,
          store.tree.activeLevel5.id,
          store.tree.activeLevel6.id,
          store.tree.activeLevel7.id,
          store.tree.activeLevel8.id,
          store.tree.activeLevel9.id,
          level10.id,
        ],
        sort: [
          store.tree.activeDataType,
          store.tree.activeCategory.name,
          store.tree.activeTaxonomy.name,
          store.tree.activeLevel3.name,
          store.tree.activeLevel4.name,
          store.tree.activeLevel5.name,
          store.tree.activeLevel6.name,
          store.tree.activeLevel7.name,
          store.tree.activeLevel8.name,
          store.tree.activeLevel9.name,
          level10.name,
        ],
        label: `${level10.name}${labelCount}`,
        childrenCount,
      }
    }
  )
}
