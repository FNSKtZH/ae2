import get from 'lodash/get'
import union from 'lodash/union'
import jwtDecode from 'jwt-decode'

const level1 = ({ treeData, activeNodeArray, treeDataLoading, mobxStore }) => {
  if (!treeData) return []
  const loading = treeDataLoading
  const pcCount = get(treeData, 'allPropertyCollections.totalCount', 0)
  const artTaxonomiesCount = treeData?.artTaxonomies?.totalCount
  const lrTaxonomiesCount = treeData?.lrTaxonomies?.totalCount
  const artenInfo =
    loading && !artTaxonomiesCount
      ? '(...)'
      : `(${artTaxonomiesCount} Taxonomie${
          artTaxonomiesCount !== 1 ? 'n' : ''
        })`
  const lrInfo =
    loading && !lrTaxonomiesCount
      ? '(...)'
      : `(${lrTaxonomiesCount} Taxonomie${lrTaxonomiesCount !== 1 ? 'n' : ''})`
  const pcInfo = loading && pcCount === 0 ? '(...)' : `(${pcCount})`
  const { token } = mobxStore.login
  const userCount = get(treeData, 'allUsers.totalCount', 0)
  const userInfo = loading && userCount === 0 ? '(...)' : `(${userCount})`
  const nodes = [
    {
      id: 'Arten',
      url: ['Arten'],
      sort: [1],
      label: 'Arten',
      info: artenInfo,
      childrenCount: artTaxonomiesCount,
      menuType: 'CmType',
    },
    {
      id: 'Lebensräume',
      url: ['Lebensräume'],
      sort: [2],
      label: 'Lebensräume',
      info: lrInfo,
      childrenCount: lrTaxonomiesCount,
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
    ...(!!token
      ? [
          {
            id: 'Benutzer',
            url: ['Benutzer'],
            sort: [4],
            label: 'Benutzer',
            info: userInfo,
            childrenCount: userCount,
            menuType: 'CmBenutzerFolder',
          },
        ]
      : []),
  ]
  if (!!token) {
    const tokenDecoded = jwtDecode(token)
    const { username } = tokenDecoded
    const user = get(treeData, 'allUsers.nodes', []).find(
      (u) => u.name === username,
    )
    const orgUsers = get(user, 'organizationUsersByUserId.nodes', [])
    const orgsUserIsAdminIn = union(
      orgUsers
        .filter((o) => o.role === 'orgAdmin')
        .map((u) => get(u, 'organizationByOrganizationId.name')),
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

export default level1
