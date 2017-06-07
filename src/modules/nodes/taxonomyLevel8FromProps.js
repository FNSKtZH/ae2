// @flow
export default (store: Object, props: Object): Array<Object> => {
  console.log('taxonomyLevel8FromProps: props:', props)
  if (!props) return []
  if (!props.taxonomyObjectById) return []
  if (!props.taxonomyObjectById.taxonomyObjectsByParentId) return []
  if (!props.taxonomyObjectById.taxonomyObjectsByParentId.nodes) return []

  return props.taxonomyObjectById.taxonomyObjectsByParentId.nodes.map(
    level8 => {
      const childrenCount = level8.taxonomyObjectsByParentId.totalCount
      const labelCount = childrenCount > 0 ? ` (${childrenCount})` : ''
      if (store.activeNodeArray[8] === level8.id) {
        store.setActiveLevel8(level8)
      }

      return {
        id: level8.id,
        url: [
          store.activeDataType,
          store.activeCategory.name,
          store.activeTaxonomy.id,
          store.activeLevel3.id,
          store.activeLevel4.id,
          store.activeLevel5.id,
          store.activeLevel6.id,
          store.activeLevel7.id,
          level8.id,
        ],
        sort: [
          store.activeDataType,
          store.activeCategory.name,
          store.activeTaxonomy.name,
          store.activeLevel3.name,
          store.activeLevel4.name,
          store.activeLevel5.name,
          store.activeLevel6.name,
          store.activeLevel7.name,
          level8.name,
        ],
        label: `${level8.name}${labelCount}`,
        childrenCount,
      }
    }
  )
}
