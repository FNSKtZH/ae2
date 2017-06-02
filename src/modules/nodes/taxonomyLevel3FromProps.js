// @flow
export default (store: Object, props: Object): Array<Object> => {
  if (!props) return []
  if (!props.allDataTypes) return []
  if (!props.allDataTypes.nodes) return []

  // find dataType
  const dataType = props.allDataTypes.nodes.find(n => n.name === 'taxonomy')
  if (!dataType) return []
  if (!dataType.categoriesByDataType) return []
  if (!dataType.categoriesByDataType.nodes) return []

  // find category
  const categoryId = store.activeNodeArray[1]
  if (!categoryId) return []
  const category = dataType.categoriesByDataType.nodes.find(
    n => n.id === categoryId
  )
  if (!category) return []
  if (!category.taxonomiesByCategory) return []
  if (!category.taxonomiesByCategory.nodes) return []

  // find taxonomy
  const taxonomyId = store.activeNodeArray[2]
  if (!taxonomyId) return []
  const taxonomy = category.taxonomiesByCategory.nodes.find(
    n => n.id === taxonomyId
  )
  if (!taxonomy) return []
  if (!taxonomy.taxonomyObjectsByTaxonomyId) return []
  if (!taxonomy.taxonomyObjectsByTaxonomyId.nodes) return []

  return taxonomy.taxonomyObjectsByTaxonomyId.nodes.map(level3 => {
    const childrenCount = level3.taxonomyObjectsByParentId.totalCount
    const labelCount = childrenCount > 0 ? ` (${childrenCount})` : ''

    return {
      id: level3.id,
      url: [dataType.name, category.id, taxonomy.id, level3.id],
      sort: [dataType.name, category.name, taxonomy.name, level3.name],
      label: `${level3.name}${labelCount}`,
      childrenCount,
    }
  })
}
