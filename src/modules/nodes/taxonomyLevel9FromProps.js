// @flow
export default (store: Object, props: Object): Array<Object> => {
  console.log('taxonomyLevel9FromProps: props:', props)
  if (!props) return []
  if (!props.taxonomyObjectById) return []
  if (!props.taxonomyObjectById.taxonomyObjectsByParentId) return []
  if (!props.taxonomyObjectById.taxonomyObjectsByParentId.nodes) return []

  return props.taxonomyObjectById.taxonomyObjectsByParentId.nodes.map(
    level9 => {
      const childrenCount = level9.taxonomyObjectsByParentId.totalCount
      const labelCount = childrenCount > 0 ? ` (${childrenCount})` : ''
      if (store.activeNodeArray[9] === level9.id) {
        store.setActiveLevel9(level9)
      }

      return {
        id: level9.id,
        url: [
          store.activeDataType,
          store.activeCategory.name,
          store.activeTaxonomy.id,
          store.activeLevel3.id,
          store.activeLevel4.id,
          store.activeLevel5.id,
          store.activeLevel6.id,
          store.activeLevel7.id,
          store.activeLevel8.id,
          level9.id,
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
          store.activeLevel8.name,
          level9.name,
        ],
        label: `${level9.name}${labelCount}`,
        childrenCount,
      }
    }
  )
}
