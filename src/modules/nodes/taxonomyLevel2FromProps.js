// @flow
export default (store: Object, props: Object): Array<Object> => {
  console.log('taxonomyLevel2FromProps: props:', props)
  if (!props) return []
  if (!props.allDataTypes) return []
  if (!props.allDataTypes.nodes) return []

  // find dataType
  const dataType = props.allDataTypes.nodes.find(n => n.name === 'taxonomy')
  if (!dataType) return []
  if (!dataType.categoriesByDataType) return []
  if (!dataType.categoriesByDataType.nodes) return []

  // find category
  const activeCategory = store.activeNodeArray[1]
  if (!activeCategory) return []
  const category = dataType.categoriesByDataType.nodes.find(
    n => n.id === activeCategory
  )
  if (!category) return []
  if (!category.taxonomiesByCategory) return []
  if (!category.taxonomiesByCategory.nodes) return []

  return category.taxonomiesByCategory.nodes.map(taxonomy => ({
    id: taxonomy.id,
    url: [dataType.name, category.id, taxonomy.id],
    label: taxonomy.name,
    childrenCount: taxonomy.taxonomyObjectsByTaxonomyId.totalCount,
  }))
}
