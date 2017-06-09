// @flow
export default ({
  store,
  props,
  activeLevel2TaxonomyName,
  activeLevel3TaxonomyName,
  activeLevel3TaxonomyId,
}: {
  store: Object,
  props: Object,
  activeLevel2TaxonomyName: String,
  activeLevel3TaxonomyName: String,
  activeLevel3TaxonomyId: Uuid,
}): Array<Object> => {
  if (!props) return []
  if (!props.level4Taxonomy) return []
  if (!props.level4Taxonomy.taxonomyObjectLevel1) return []
  if (!props.level4Taxonomy.taxonomyObjectLevel1.nodes) return []

  return props.level4Taxonomy.taxonomyObjectLevel1.nodes.map(node => {
    const childrenCount = node.taxonomyObjectsByParentId &&
      node.taxonomyObjectsByParentId.totalCount
      ? node.taxonomyObjectsByParentId.totalCount
      : 0
    const labelCount = childrenCount > 0 ? ` (${childrenCount})` : ''

    return {
      id: node.id,
      url: [
        'Taxonomien',
        activeLevel2TaxonomyName,
        activeLevel3TaxonomyId,
        node.id,
      ],
      sort: [1, activeLevel2TaxonomyName, activeLevel3TaxonomyName, node.name],
      label: `${node.name}${labelCount}`,
      childrenCount,
    }
  })
}
