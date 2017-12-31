// @flow
import get from 'lodash/get'

export default ({ treeData }: { treeData: Object }): Array<Object> => {
  if (!treeData) return []
  if (!treeData.allUsers) return []
  if (!treeData.allUsers.nodes) return []

  return treeData.allUsers.nodes.map(node => ({
      id: node.id,
      url: ['Benutzer', node.name],
      sort: [3, node.name],
      label: node.name,
      childrenCount: 0,
    })
  )
}
