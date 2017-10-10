// @flow
export default ({ data }: { data: Object }): Array<Object> => {
  if (!data) return []
  if (!data.level2Taxonomy) return []
  if (!data.level2Taxonomy.nodes) return []

  return data.level2Taxonomy.nodes.map(node => ({
    id: node.id,
    url: ['Taxonomien', node.name],
    sort: [1, node.name],
    label: `${node.name} (${node.count})`,
    childrenCount: node.count,
  }))
}
