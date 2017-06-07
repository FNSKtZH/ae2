// @flow
export default (store: Object, props: Object): Array<Object> => {
  console.log('taxonomyLevel4FromProps: props:', props)
  if (!props) return []
  if (!props.taxonomyObjectById) return []
  if (!props.taxonomyObjectById.taxonomyObjectsByParentId) return []
  if (!props.taxonomyObjectById.taxonomyObjectsByParentId.nodes) return []

  return props.taxonomyObjectById.taxonomyObjectsByParentId.nodes.map(
    level4 => {
      const childrenCount = level4.taxonomyObjectsByParentId.totalCount
      const labelCount = childrenCount > 0 ? ` (${childrenCount})` : ''
      if (store.activeNodeArray[4] === level4.id) {
        store.setActiveLevel4(level4)
      }

      return {
        id: level4.id,
        url: [
          store.activeDataType,
          store.activeCategory.name,
          store.activeTaxonomy.id,
          store.activeLevel3.id,
          level4.id,
        ],
        sort: [
          store.activeDataType,
          store.activeCategory.name,
          store.activeTaxonomy.name,
          store.activeLevel3.name,
          level4.name,
        ],
        label: `${level4.name}${labelCount}`,
        childrenCount,
      }
    }
  )
}
