// @flow
export default ({
  store,
  props,
  activeLevel2TaxonomyName,
}: {
  store: Object,
  props: Object,
  activeLevel2TaxonomyName: ?String,
}): Array<Object> => {
  if (!props) return []
  if (!props.level3Taxonomy) return []
  if (!props.level3Taxonomy) return []
  if (!props.level3Taxonomy.nodes) return []

  return props.level3Taxonomy.nodes.map(node => {
    const childrenCount =
      node.objectLevel1 && node.objectLevel1.totalCount
        ? node.objectLevel1.totalCount
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
