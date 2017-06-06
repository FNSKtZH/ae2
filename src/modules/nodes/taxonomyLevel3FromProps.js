// @flow
export default (store: Object, props: Object): Array<Object> => {
  console.log('taxonomyLevel3FromProps: props:', props)
  if (!props) return []
  if (!props.allDataTypes) return []
  if (!props.allDataTypes.nodes) return []

  // find dataType
  const dataType = props.allDataTypes.nodes.find(n => n.name === 'taxonomy')
  if (!dataType) return []
  if (!dataType.categoriesByDataType) return []
  if (!dataType.categoriesByDataType.nodes) return []

  // find category
  const categoryName = store.activeNodeArray[1]
  if (!categoryName) return []
  const category = dataType.categoriesByDataType.nodes.find(
    n => n.name === categoryName
  )
  if (!category) return []
  if (!category.taxonomyByCategory) return []
  if (!category.taxonomyByCategory.nodes) return []

  // find taxonomy
  const taxonomyId = store.activeNodeArray[2]
  if (!taxonomyId) return []
  const taxonomy = category.taxonomyByCategory.nodes.find(
    n => n.id === taxonomyId
  )
  if (!taxonomy) return []
  if (!taxonomy.taxonomyObjectLevel1) return []
  if (!taxonomy.taxonomyObjectLevel1.nodes) return []

  return taxonomy.taxonomyObjectLevel1.nodes.map(level3 => {
    const childrenCount = level3.taxonomyObjectsByParentId.totalCount
    const labelCount = childrenCount > 0 ? ` (${childrenCount})` : ''

    return {
      id: level3.id,
      url: [dataType.name, category.name, taxonomy.id, level3.id],
      sort: [dataType.name, category.name, taxonomy.name, level3.name],
      label: `${level3.name}${labelCount}`,
      childrenCount,
    }
  })
}
