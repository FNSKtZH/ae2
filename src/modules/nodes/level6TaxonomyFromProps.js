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
  activeLevel2TaxonomyName: ?String,
  activeLevel3TaxonomyName: ?String,
  activeLevel3TaxonomyId: ?String,
  activeLevel4TaxonomyName: ?String,
  activeLevel4TaxonomyId: ?String,
  activeLevel5TaxonomyName: ?String,
  activeLevel5TaxonomyId: ?String,
}): Array<Object> => {
  if (!props) return []
  if (!props.level6Taxonomy) return []
  if (!props.level6Taxonomy.objectsByParentId) return []
  if (!props.level6Taxonomy.objectsByParentId.nodes) return []
  const { nodes } = props.level6Taxonomy.objectsByParentId

  return nodes.map(node => {
    const labelCount = nodes.length > 0 ? ` (${nodes.length})` : ''

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
      childrenCount: nodes.length,
    }
  })
}
