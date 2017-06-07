// @flow
export default (store: Object, props: Object): Array<Object> => {
  console.log('taxonomyLevel6FromProps, props:', props)
  if (!props) return []
  if (!props.taxonomyObjectById) return []
  if (!props.taxonomyObjectById.taxonomyObjectsByParentId) return []
  if (!props.taxonomyObjectById.taxonomyObjectsByParentId.nodes) return []

  return props.taxonomyObjectById.taxonomyObjectsByParentId.nodes.map(
    level6 => {
      const childrenCount = level6.taxonomyObjectsByParentId.totalCount
      const labelCount = childrenCount > 0 ? ` (${childrenCount})` : ''
      if (store.activeNodeArray[6] === level6.id) {
        store.setActiveLevel6(level6)
      }

      return {
        id: level6.id,
        url: [
          store.activeDataType,
          store.activeCategory.name,
          store.activeTaxonomy.id,
          store.activeLevel3.id,
          store.activeLevel4.id,
          store.activeLevel5.id,
          level6.id,
        ],
        sort: [
          store.activeDataType,
          store.activeCategory.name,
          store.activeTaxonomy.name,
          store.activeLevel3.name,
          store.activeLevel4.name,
          store.activeLevel5.name,
          level6.name,
        ],
        label: `${level6.name}${labelCount}`,
        childrenCount,
      }
    }
  )
}
