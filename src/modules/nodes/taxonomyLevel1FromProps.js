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

  return dataType.categoriesByDataType.nodes.map(category => {
    const childrenCount = category.taxonomiesByCategory.totalCount
    const taxonomyText = childrenCount !== 1 ? 'Taxonomien' : 'Taxonomie'
    const labelCount = ` (${childrenCount} ${taxonomyText})`

    return {
      id: category.id,
      url: [dataType.name, category.name],
      sort: [dataType.name, category.name],
      label: `${category.name}${labelCount}`,
      childrenCount,
    }
  })
}
