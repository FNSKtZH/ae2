// @flow
import get from 'lodash/get'

export default ({ treeData }: { treeData: Object }): Array<Object> => {
  if (!treeData) return []
  const nodes = get(treeData, 'allUsers.nodes', [])

  return nodes.map(node => ({
    id: node.id,
    url: ['Benutzer', node.id],
    sort: [4, node.name],
    label: node.name,
    childrenCount: 0,
    menuType: 'CmBenutzer',
  }))
}
