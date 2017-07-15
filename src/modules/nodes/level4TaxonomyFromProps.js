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
  activeLevel2TaxonomyName: ?String,
  activeLevel3TaxonomyName: ?String,
  activeLevel3TaxonomyId: ?String,
}): Array<Object> => {
  if (!props) return []
  if (!props.level4Taxonomy) return []
  if (!props.level4Taxonomy.objectLevel1) return []
  if (!props.level4Taxonomy.objectLevel1.nodes) return []
  const { nodes } = props.level4Taxonomy.objectLevel1

  return nodes.map(node => {
    const labelCount = nodes.length > 0 ? ` (${nodes.length})` : ''

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
      childrenCount: nodes.length,
    }
  })
}
