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
}): Array<Object> => {
  if (!props) return []
  if (!props.level6Taxonomy) return []
  if (!props.level6Taxonomy.taxonomyObjectsByParentId) return []
  if (!props.level6Taxonomy.taxonomyObjectsByParentId.nodes) return []

  return props.level6Taxonomy.taxonomyObjectsByParentId.nodes.map(node => {
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
        node.id,
      ],
      sort: [
        1,
        activeLevel2TaxonomyName,
        activeLevel3TaxonomyName,
        activeLevel4TaxonomyName,
        activeLevel5TaxonomyName,
        node.name,
      ],
      label: `${node.name}${labelCount}`,
      childrenCount,
    }
  })
}
