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
  const loading = get(treeData, 'loading', false)
  const pcCount = get(treeData, 'allPropertyCollections.totalCount', 0)
  const taxonomies = get(treeData, 'allTaxonomies.nodes', [])
  const artTaxonomies = taxonomies.filter(t => t.type === 'ART')
  const lrTaxonomies = taxonomies.filter(t => t.type === 'LEBENSRAUM')
  const artenInfo =
    loading && artTaxonomies.length === 0
      ? '(...)'
      : `(${artTaxonomies.length} Taxonomie${
          artTaxonomies.length !== 1 ? 'n' : ''
        })`
  const lrInfo =
    loading && lrTaxonomies.length === 0
      ? '(...)'
      : `(${lrTaxonomies.length} Taxonomie${
          lrTaxonomies.length !== 1 ? 'n' : ''
        })`
  const pcInfo = loading && pcCount === 0 ? '(...)' : `(${pcCount})`
  const nodes = [
    {
      id: 'Arten',
      url: ['Arten'],
      sort: [1],
      label: 'Arten',
      info: artenInfo,
      childrenCount: artTaxonomies.length,
      menuType: 'CmType',
    },
    {
      id: 'Lebensräume',
      url: ['Lebensräume'],
      sort: [2],
      label: 'Lebensräume',
      info: lrInfo,
      childrenCount: lrTaxonomies.length,
      menuType: 'CmType',
    },
    {
      id: 'Eigenschaften-Sammlungen',
      url: ['Eigenschaften-Sammlungen'],
      sort: [3],
      label: 'Eigenschaften-Sammlungen',
      info: pcInfo,
      childrenCount: pcCount,
      menuType: 'CmPCFolder',
    },
  ]
  const token = get(loginData, 'login.token')
  const userCount = get(treeData, 'allUsers.totalCount', 0)
  const userInfo = loading && userCount === 0 ? '(...)' : `(${userCount})`
  if (!!token) {
    nodes.push({
      id: 'Benutzer',
      url: ['Benutzer'],
      sort: [4],
      label: 'Benutzer',
      info: userInfo,
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
    const orgInfo =
      loading && orgsUserIsAdminIn.length === 0
        ? '(...)'
        : `(${orgsUserIsAdminIn.length.toLocaleString('de-CH')})`
    if (orgsUserIsAdminIn.length > 0) {
      nodes.push({
        id: 'Organisationen',
        url: ['Organisationen'],
        sort: [5],
        label: 'Organisationen',
        info: orgInfo,
        childrenCount: orgsUserIsAdminIn.length,
        menuType: 'orgFolder',
      })
    }
  }
  return nodes
}
