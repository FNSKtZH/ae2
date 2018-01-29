// @flow
import get from 'lodash/get'
import union from 'lodash/union'
import jwtDecode from 'jwt-decode'

export default ({
  treeData,
  activeNodeArray,
  loginData,
}: {
  treeData: Object,
  activeNodeArray: Array<String>,
  loginData: Object,
}): Array<Object> => {
  if (!treeData) return []
  const pcCount = get(treeData, 'allPropertyCollections.totalCount', 0)
  const taxonomies = get(treeData, 'allTaxonomies.nodes', [])
  console.log('level1: taxonomies:', taxonomies)
  const artTaxonomies = taxonomies.filter(t => t.type === 'ART')
  const lrTaxonomies = taxonomies.filter(t => t.type === 'LEBENSRAUM')
  const nodes = [
    {
      id: 'Arten',
      url: ['Arten'],
      sort: [1],
      label: 'Arten',
      info: `(${artTaxonomies.length} Taxonomien)`,
      childrenCount: artTaxonomies.length,
      menuType: 'CmTaxFolder',
    },
    {
      id: 'Lebensräume',
      url: ['Lebensräume'],
      sort: [2],
      label: 'Lebensräume',
      info: `(${lrTaxonomies.length} Taxonomien)`,
      childrenCount: lrTaxonomies.length,
      menuType: 'CmTaxFolder',
    },
    {
      id: 'Eigenschaften-Sammlungen',
      url: ['Eigenschaften-Sammlungen'],
      sort: [3],
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
      sort: [4],
      label: 'Benutzer',
      info: `(${userCount})`,
      childrenCount: userCount,
      menuType: 'CmBenutzerFolder',
    })
    const tokenDecoded = jwtDecode(token)
    const { username } = tokenDecoded
    const user = get(treeData, 'allUsers.nodes', []).find(
      u => u.name === username
    )
    const orgUsers = get(user, 'organizationUsersByUserId.nodes', [])
    const userRoles = orgUsers
      .filter(u => get(u, 'organizationByOrganizationId.name', '' === username))
      .map(u => u.role)
    const userOrganizations = union(
      orgUsers.map(u => get(u, 'organizationByOrganizationId.name'))
    )
    const userIsOrgAdmin = userRoles.includes('orgAdmin')
    if (userIsOrgAdmin) {
      nodes.push({
        id: 'Organisationen',
        url: ['Organisationen'],
        sort: [5],
        label: 'Organisationen',
        info: `(${userOrganizations.length.toLocaleString('de-CH')})`,
        childrenCount: userOrganizations.length,
        menuType: 'orgFolder',
      })
    }
  }
  return nodes
}
