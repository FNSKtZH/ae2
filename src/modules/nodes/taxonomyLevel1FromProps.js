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
    const childrenCount = category.taxonomyByCategory.totalCount
    const taxonomyText = childrenCount !== 1 ? 'Taxonomien' : 'Taxonomie'
    const labelCount = ` (${childrenCount} ${taxonomyText})`
    if (store.activeNodeArray[1] === category.name) {
      store.setActiveCategory(category)
    }

    return {
      id: category.id,
      url: [store.activeDataType.name, category.name],
      sort: [store.activeDataType.name, category.name],
      label: `${category.name}${labelCount}`,
      childrenCount,
    }
  })
}
