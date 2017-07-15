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
}): Array<Object> => {
  if (!props) return []
  if (!props.level8Taxonomy) return []
  if (!props.level8Taxonomy.objectsByParentId) return []
  if (!props.level8Taxonomy.objectsByParentId.nodes) return []
  const { nodes } = props.level8Taxonomy.objectsByParentId

  return nodes.map(node => {
    const childrenCount = nodes.length
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
        node.name,
      ],
      label: `${node.name}${labelCount}`,
      childrenCount,
    }
  })
}
