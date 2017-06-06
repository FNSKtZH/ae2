// @flow
export default (store: Object, props: Object): Array<Object> => {
  console.log('taxonomyLevel1FromProps: props:', props)
  if (!props) return []
  if (!props.dataTypeByName) return []
  if (!props.dataTypeByName.categoryByDataType) return []
  if (!props.dataTypeByName.categoryByDataType.nodes) return []

  console.log(
    'taxonomyLevel1FromProps: props.dataTypeByName.categoryByDataType.nodes:',
    props.dataTypeByName.categoryByDataType.nodes
  )

  return props.dataTypeByName.categoryByDataType.nodes.map(category => {
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
