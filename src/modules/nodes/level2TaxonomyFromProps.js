// @flow
export default (store: Object, props: Object): Array<Object> => {
  if (!props) return []
  if (!props.categoryByDataType) return []
  if (!props.categoryByDataType.nodes) return []

  return props.categoryByDataType.nodes.map(category => {
    const childrenCount = category.taxonomyByCategory.totalCount
    // const taxonomyText = childrenCount !== 1 ? 'Taxonomien' : 'Taxonomie'
    // const labelCount = ` (${childrenCount} ${taxonomyText})`
    const labelCount = ` (${childrenCount})`
    if (store.activeNodeArray[1] === category.name) {
      store.tree.setActiveLevel2Taxonomy(category)
    }

    return {
      id: category.id,
      url: [store.tree.activeLevel1, category.name],
      sort: [store.tree.activeLevel1, category.name],
      label: `${category.name}${labelCount}`,
      childrenCount,
    }
  })
}
