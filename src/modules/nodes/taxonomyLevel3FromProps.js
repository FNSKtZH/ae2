// @flow
export default (store: Object, props: Object): Array<Object> => {
  console.log('taxonomyLevel3FromProps: props:', props)
  if (!props) return []
  if (!props.taxonomyById) return []
  if (!props.taxonomyById.taxonomyObjectLevel1) return []
  if (!props.taxonomyById.taxonomyObjectLevel1.nodes) return []

  return props.taxonomyById.taxonomyObjectLevel1.nodes.map(level3 => {
    const childrenCount = level3.taxonomyObjectsByParentId.totalCount
    const labelCount = childrenCount > 0 ? ` (${childrenCount})` : ''

    return {
      id: level3.id,
      url: [
        store.activeDataType.name,
        store.activeCategory.name,
        store.activeTaxonomy.id,
        level3.id,
      ],
      sort: [
        store.activeDataType.name,
        store.activeCategory.name,
        store.activeTaxonomy.name,
        level3.name,
      ],
      label: `${level3.name}${labelCount}`,
      childrenCount,
    }
  })
}
