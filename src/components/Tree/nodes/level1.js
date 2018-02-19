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
  //console.log('level1: treeData:', treeData)
  if (!treeData) return []
  const pcCount = get(treeData, 'allPropertyCollections.totalCount', 0)
  const taxonomies = get(treeData, 'allTaxonomies.nodes', [])
  const artTaxonomies = taxonomies.filter(t => t.type === 'ART')
  const lrTaxonomies = taxonomies.filter(t => t.type === 'LEBENSRAUM')
  const nodes = [
    {
      id: 'Arten',
      url: ['Arten'],
      sort: [1],
      label: 'Arten',
      info: `(${artTaxonomies.length} Taxonomie${
        artTaxonomies.length !== 1 ? 'n' : ''
      })`,
      childrenCount: artTaxonomies.length,
      menuType: 'CmType',
    },
    {
      id: 'Lebensräume',
      url: ['Lebensräume'],
      sort: [2],
      label: 'Lebensräume',
      info: `(${lrTaxonomies.length} Taxonomie${
        lrTaxonomies.length !== 1 ? 'n' : ''
      })`,
      childrenCount: lrTaxonomies.length,
      menuType: 'CmType',
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
  const token = get(loginData, 'login.token')
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
    const orgsUserIsAdminIn = union(
      orgUsers
        .filter(o => o.role === 'orgAdmin')
        .map(u => get(u, 'organizationByOrganizationId.name'))
    )
    if (orgsUserIsAdminIn.length > 0) {
      nodes.push({
        id: 'Organisationen',
        url: ['Organisationen'],
        sort: [5],
        label: 'Organisationen',
        info: `(${orgsUserIsAdminIn.length.toLocaleString('de-CH')})`,
        childrenCount: orgsUserIsAdminIn.length,
        menuType: 'orgFolder',
      })
    }
  }
  return nodes
}
