// @flow
export default (store: Object, props: Object): Array<Object> => {
  console.log('taxonomyLevel3FromProps: props:', props)
  if (!props) return []
  if (!store.dataType) return []
  if (!store.category) return []
  if (!store.taxonomy) return []
  if (!taxonomy.taxonomyObjectLevel1) return []
  if (!taxonomy.taxonomyObjectLevel1.nodes) return []

  return taxonomy.taxonomyObjectLevel1.nodes.map(level3 => {
    const childrenCount = level3.taxonomyObjectsByParentId.totalCount
    const labelCount = childrenCount > 0 ? ` (${childrenCount})` : ''

    return {
      id: level3.id,
      url: [
        store.activeDataType.name,
        store.activeCategory.name,
        taxonomy.id,
        level3.id,
      ],
      sort: [
        store.activeDataType.name,
        store.activeCategory.name,
        taxonomy.name,
        level3.name,
      ],
      label: `${level3.name}${labelCount}`,
      childrenCount,
    }
  })
}
