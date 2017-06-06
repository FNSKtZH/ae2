// @flow
export default (
  store: Object,
  props: Object,
  dataType: Object,
  category: Object,
  taxonomy: Object
): Array<Object> => {
  console.log('taxonomyLevel3FromProps: props:', props)
  if (!props) return []
  if (!dataType) return []
  if (!category) return []
  if (!taxonomy) return []
  if (!taxonomy.taxonomyObjectLevel1) return []
  if (!taxonomy.taxonomyObjectLevel1.nodes) return []

  return taxonomy.taxonomyObjectLevel1.nodes.map(level3 => {
    const childrenCount = level3.taxonomyObjectsByParentId.totalCount
    const labelCount = childrenCount > 0 ? ` (${childrenCount})` : ''

    return {
      id: level3.id,
      url: [store.activeDataType.name, category.name, taxonomy.id, level3.id],
      sort: [
        store.activeDataType.name,
        category.name,
        taxonomy.name,
        level3.name,
      ],
      label: `${level3.name}${labelCount}`,
      childrenCount,
    }
  })
}
