// @flow
import get from 'lodash/get'
import union from 'lodash/union'
import jwtDecode from 'jwt-decode'

export default ({
  treeData,
  loginData,
}: {
  treeData: Object,
  loginData: Object,
}): Array<Object> => {
  if (!treeData) return []
  if (!treeData.allUsers) return []
  if (!treeData.allUsers.nodes) return []
  const token = get(loginData, 'login.token', '')
  const tokenDecoded = jwtDecode(token)
  const { username } = tokenDecoded
  const user = get(treeData, 'allUsers.nodes', []).find(
    u => u.name === username
  )
  const orgUsers = get(user, 'organizationUsersByUserId.nodes', [])
  const userOrganizations = union(
    orgUsers.map(u => get(u, 'organizationByOrganizationId.name'))
  )

  return userOrganizations.map(org => ({
    id: org,
    url: ['Organisationen', org],
    sort: [4, org],
    label: org,
    childrenCount: 0,
    menuType: 'organization',
  }))
}
