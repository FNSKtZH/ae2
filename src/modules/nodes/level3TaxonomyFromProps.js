// @flow
export default (store: Object, props: Object): Array<Object> => {
  if (!props) return []
  if (!props.categoryByName) return []
  if (!props.categoryByName.taxonomiesByCategory) return []
  if (!props.categoryByName.taxonomiesByCategory.nodes) return []

  return props.categoryByName.taxonomiesByCategory.nodes.map(taxonomy => {
    const childrenCount = taxonomy.taxonomyObjectLevel1.totalCount
    const labelCount = ` (${childrenCount})`
    if (store.activeNodeArray[2] === taxonomy.id) {
      store.tree.setActiveTaxonomy(taxonomy)
    }

    return {
      id: taxonomy.id,
      url: [store.tree.activeDataType, store.tree.activeCategory.name, taxonomy.id],
      sort: [store.tree.activeDataType, store.tree.activeCategory.name, taxonomy.name],
      label: `${taxonomy.name}${labelCount}`,
      childrenCount,
    }
  })
}
