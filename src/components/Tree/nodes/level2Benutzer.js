// @flow
import get from 'lodash/get'

export default ({ treeData }: { treeData: Object }): Array<Object> => {
  if (!treeData) return []
  const nodes = get(treeData, 'allUsers.nodes', [])

  return nodes.map(n => ({
    id: n.id,
    url: ['Benutzer', n.id],
    sort: [4, n.name],
    label: n.name,
    childrenCount: 0,
    menuType: 'CmBenutzer',
  }))
}
