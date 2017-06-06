// @flow
export default (store: Object, props: Object): Array<Object> => {
  if (!props) return []
  if (!props.taxonomyById) return []
  if (!props.taxonomyById.taxonomyObjectLevel1) return []
  if (!props.taxonomyById.taxonomyObjectLevel1.nodes) return []

  return props.taxonomyById.taxonomyObjectLevel1.nodes.map(level3 => {
    const childrenCount = level3.taxonomyObjectsByParentId.totalCount
    const labelCount = childrenCount > 0 ? ` (${childrenCount})` : ''
    if (store.activeNodeArray[3] === level3.id) {
      store.setActiveLevel3(level3)
    }

    return {
      id: level3.id,
      url: [
        store.activeDataType.name,
        store.activeCategory.name,
        store.activeTaxonomy.id,
        level3.id,
      ],
      sort: [
        store.activeDataType.name,
        store.activeCategory.name,
        store.activeTaxonomy.name,
        level3.name,
      ],
      label: `${level3.name}${labelCount}`,
      childrenCount,
    }
  })
}
