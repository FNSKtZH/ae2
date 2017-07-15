// @flow
export default (store: Object, props: Object): Array<Object> => {
  if (!props) return []
  if (!props.level2Taxonomy) return []
  if (!props.level2Taxonomy.nodes) return []
  const { nodes } = props.level2Taxonomy

  return nodes.map(node => ({
    id: node.id,
    url: ['Taxonomien', node.name],
    sort: [1, node.name],
    label: `${node.name} (${node.count})`,
    childrenCount: node.count,
  }))
}
