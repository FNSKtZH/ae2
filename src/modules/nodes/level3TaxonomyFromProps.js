// @flow
export default ({
  store,
  props,
  activeLevel2TaxonomyName,
}: {
  store: Object,
  props: Object,
  activeLevel2TaxonomyName: String,
}): Array<Object> => {
  if (!props) return []
  if (!props.level3Taxonomy) return []
  if (!props.level3Taxonomy.taxonomiesByCategory) return []
  if (!props.level3Taxonomy.taxonomiesByCategory.nodes) return []

  return props.level3Taxonomy.taxonomiesByCategory.nodes.map(node => {
    const childrenCount = node.taxonomyObjectLevel1 &&
      node.taxonomyObjectLevel1.totalCount
      ? node.taxonomyObjectLevel1.totalCount
      : 0

    return {
      id: node.id,
      url: ['Taxonomien', activeLevel2TaxonomyName, node.id],
      sort: [1, activeLevel2TaxonomyName, node.name],
      label: `${node.name} (${childrenCount})`,
      childrenCount,
    }
  })
}
