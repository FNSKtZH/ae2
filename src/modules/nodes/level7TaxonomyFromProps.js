// @flow
export default ({
  store,
  props,
  activeLevel2TaxonomyName,
  activeLevel3TaxonomyName,
  activeLevel3TaxonomyId,
  activeLevel4TaxonomyName,
  activeLevel4TaxonomyId,
  activeLevel5TaxonomyName,
  activeLevel5TaxonomyId,
  activeLevel6TaxonomyName,
  activeLevel6TaxonomyId,
}: {
  store: Object,
  props: Object,
  activeLevel2TaxonomyName: String,
  activeLevel3TaxonomyName: String,
  activeLevel3TaxonomyId: Uuid,
  activeLevel4TaxonomyName: String,
  activeLevel4TaxonomyId: Uuid,
  activeLevel5TaxonomyName: String,
  activeLevel5TaxonomyId: Uuid,
  activeLevel6TaxonomyName: String,
  activeLevel6TaxonomyId: Uuid,
}): Array<Object> => {
  if (!props) return []
  if (!props.level7Taxonomy) return []
  if (!props.level7Taxonomy.taxonomyObjectsByParentId) return []
  if (!props.level7Taxonomy.taxonomyObjectsByParentId.nodes) return []

  return props.level7Taxonomy.taxonomyObjectsByParentId.nodes.map(node => {
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
        activeLevel4TaxonomyId,
        activeLevel5TaxonomyId,
        activeLevel6TaxonomyId,
        node.id,
      ],
      sort: [
        1,
        activeLevel2TaxonomyName,
        activeLevel3TaxonomyName,
        activeLevel4TaxonomyName,
        activeLevel5TaxonomyName,
        activeLevel6TaxonomyName,
        node.name,
      ],
      label: `${node.name}${labelCount}`,
      childrenCount,
    }
  })
}
