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
  activeLevel2TaxonomyName: ?String,
  activeLevel3TaxonomyName: ?String,
  activeLevel3TaxonomyId: ?String,
  activeLevel4TaxonomyName: ?String,
  activeLevel4TaxonomyId: ?String,
  activeLevel5TaxonomyName: ?String,
  activeLevel5TaxonomyId: ?String,
  activeLevel6TaxonomyName: ?String,
  activeLevel6TaxonomyId: ?String,
  activeLevel7TaxonomyName: ?String,
  activeLevel7TaxonomyId: ?String,
  activeLevel8TaxonomyName: ?String,
  activeLevel8TaxonomyId: ?String,
  activeLevel9TaxonomyName: ?String,
  activeLevel9TaxonomyId: ?String,
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
