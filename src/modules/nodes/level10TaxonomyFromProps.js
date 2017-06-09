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
  activeLevel7TaxonomyName,
  activeLevel7TaxonomyId,
  activeLevel8TaxonomyName,
  activeLevel8TaxonomyId,
  activeLevel9TaxonomyName,
  activeLevel9TaxonomyId,
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
  activeLevel7TaxonomyName: String,
  activeLevel7TaxonomyId: Uuid,
  activeLevel8TaxonomyName: String,
  activeLevel8TaxonomyId: Uuid,
  activeLevel9TaxonomyName: String,
  activeLevel9TaxonomyId: Uuid,
}): Array<Object> => {
  if (!props) return []
  if (!props.level10Taxonomy) return []
  if (!props.level10Taxonomy.taxonomyObjectsByParentId) return []
  if (!props.level10Taxonomy.taxonomyObjectsByParentId.nodes) return []

  return props.level10Taxonomy.taxonomyObjectsByParentId.nodes.map(node => {
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
        activeLevel7TaxonomyId,
        activeLevel8TaxonomyId,
        activeLevel9TaxonomyId,
        node.id,
      ],
      sort: [
        1,
        activeLevel2TaxonomyName,
        activeLevel3TaxonomyName,
        activeLevel4TaxonomyName,
        activeLevel5TaxonomyName,
        activeLevel6TaxonomyName,
        activeLevel7TaxonomyName,
        activeLevel8TaxonomyName,
        activeLevel9TaxonomyName,
        node.name,
      ],
      label: `${node.name}${labelCount}`,
      childrenCount,
    }
  })
}
