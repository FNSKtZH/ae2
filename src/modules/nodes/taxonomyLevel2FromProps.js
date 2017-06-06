// @flow
export default (store: Object, props: Object): Array<Object> => {
  console.log('taxonomyLevel2FromProps: props:', props)
  if (!props) return []
  if (!props.categoryByName) return []
  if (!props.categoryByName.taxonomiesByCategory) return []
  if (!props.categoryByName.taxonomiesByCategory.nodes) return []

  return props.categoryByName.taxonomiesByCategory.nodes.map(taxonomy => {
    const childrenCount = taxonomy.taxonomyObjectLevel1.totalCount
    const labelCount = ` (${childrenCount})`
    if (store.activeNodeArray[2] === taxonomy.id) {
      store.setActiveTaxonomy(taxonomy)
    }

    return {
      id: taxonomy.id,
      url: [store.activeDataType.name, store.activeCategory.name, taxonomy.id],
      sort: [
        store.activeDataType.name,
        store.activeCategory.name,
        taxonomy.name,
      ],
      label: `${taxonomy.name}${labelCount}`,
      childrenCount,
    }
  })
}
