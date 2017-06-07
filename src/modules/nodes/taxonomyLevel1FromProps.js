// @flow
export default (store: Object, props: Object): Array<Object> => {
  if (!props) return []
  if (!props.categoryByDataType) return []
  if (!props.categoryByDataType.nodes) return []

  return props.categoryByDataType.nodes.map(category => {
    const childrenCount = category.taxonomyByCategory.totalCount
    const taxonomyText = childrenCount !== 1 ? 'Taxonomien' : 'Taxonomie'
    const labelCount = ` (${childrenCount} ${taxonomyText})`
    if (store.activeNodeArray[1] === category.name) {
      store.setActiveCategory(category)
    }

    return {
      id: category.id,
      url: [store.activeDataType, category.name],
      sort: [store.activeDataType, category.name],
      label: `${category.name}${labelCount}`,
      childrenCount,
    }
  })
}
