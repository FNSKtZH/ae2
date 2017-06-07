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
        store.setActiveLevel10(level10)
      }

      return {
        id: level10.id,
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
          store.activeLevel9.id,
          level10.id,
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
          store.activeLevel9.name,
          level10.name,
        ],
        label: `${level10.name}${labelCount}`,
        childrenCount,
      }
    }
  )
}
