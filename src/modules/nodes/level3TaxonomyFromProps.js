// @flow
export default ({
  data,
  activeLevel2TaxonomyName,
}: {
  data: Object,
  activeLevel2TaxonomyName: ?String,
}): Array<Object> => {
  if (!data) return []
  if (!data.level3Taxonomy) return []
  if (!data.level3Taxonomy) return []
  if (!data.level3Taxonomy.nodes) return []

  return data.level3Taxonomy.nodes.map(node => {
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
