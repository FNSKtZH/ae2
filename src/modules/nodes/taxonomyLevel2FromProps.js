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

  return category.taxonomiesByCategory.nodes.map(taxonomy => {
    const childrenCount = taxonomy.taxonomyObjectsByTaxonomyId.totalCount
    const labelCount = ` (${childrenCount})`

    return {
      id: taxonomy.id,
      url: [dataType.name, category.id, taxonomy.id],
      label: `${taxonomy.name}${labelCount}`,
      childrenCount,
    }
  })
}
