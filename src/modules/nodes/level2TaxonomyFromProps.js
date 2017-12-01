// @flow
export default ({ treeData }: { treeData: Object }): Array<Object> => {
  if (!treeData) return []
  if (!treeData.level2Taxonomy) return []
  if (!treeData.level2Taxonomy.nodes) return []

  return treeData.level2Taxonomy.nodes.map(node => ({
    id: node.id,
    url: ['Taxonomien', node.name],
    sort: [1, node.name],
    label: `${node.name} (${node.count})`,
    childrenCount: node.count,
  }))
}
