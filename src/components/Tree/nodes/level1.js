// @flow
import get from 'lodash/get'
import union from 'lodash/union'
import jwtDecode from 'jwt-decode'

export default ({
  treeData,
  allCategoriesData,
  activeNodeArray,
  loginData,
}: {
  treeData: Object,
  allCategoriesData: Object,
  activeNodeArray: Array<String>,
  loginData: Object,
}): Array<Object> => {
  if (!treeData) return []
  const pcCount = get(treeData, 'allPropertyCollections.totalCount', 0)
  const catCount = get(allCategoriesData, 'allCategories.totalCount', 0)
  const nodes = [
    {
      id: 'Taxonomien',
      url: ['Taxonomien'],
      sort: [1],
      label: 'Arten und Lebensräume',
      info: `(${catCount} Gruppen)`,
      childrenCount: catCount,
      menuType: 'CmTaxFolder',
    },
    {
      id: 'Eigenschaften-Sammlungen',
      url: ['Eigenschaften-Sammlungen'],
      sort: [2],
      label: 'Eigenschaften-Sammlungen',
      info: `(${pcCount})`,
      childrenCount: pcCount,
      menuType: 'CmPCFolder',
    },
  ]
  const token = get(loginData, 'login.token', '')
  const userCount = get(treeData, 'allUsers.totalCount', 0)
  if (!!token) {
    nodes.push({
      id: 'Benutzer',
      url: ['Benutzer'],
      sort: [3],
      label: 'Benutzer',
      info: `(${userCount})`,
      childrenCount: userCount,
      menuType: 'CmBenutzerFolder',
    })
    const tokenDecoded = jwtDecode(token)
    const { role, username } = tokenDecoded
    const user = get(treeData, 'allUsers.nodes', []).find(
      u => u.name === username
    )
    const orgUsers = get(user, 'organizationUsersByUserId.nodes', [])
    const userOrganizations = union(
      orgUsers.map(u => get(u, 'organizationByOrganizationId.name'))
    )
    if (role === 'org_admin') {
      nodes.push({
        id: 'Organisationen',
        url: ['Organisationen'],
        sort: [4],
        label: 'Organisationen',
        info: `(${userOrganizations.length.toLocaleString('de-CH')})`,
        childrenCount: userOrganizations.length,
        menuType: 'orgFolder',
      })
    }
  }
  return nodes
}
