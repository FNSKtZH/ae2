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
  const { nodes } = props.level3Taxonomy

  return nodes.map(node => ({
    id: node.id,
    url: ['Taxonomien', activeLevel2TaxonomyName, node.id],
    sort: [1, activeLevel2TaxonomyName, node.name],
    label: `${node.name} (${nodes.length})`,
    childrenCount: nodes.length,
  }))
}
