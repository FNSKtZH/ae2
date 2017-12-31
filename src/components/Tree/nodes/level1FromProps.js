// @flow
import get from 'lodash/get'

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
    },
    {
      id: 'Eigenschaften-Sammlungen',
      url: ['Eigenschaften-Sammlungen'],
      sort: [2],
      label: 'Eigenschaften-Sammlungen',
      info: `(${pcCount})`,
      childrenCount: pcCount,
    },
  ]
  const token = get(loginData, 'login.token', '')
  const usersCount = get(treeData, 'allUsers.totalCount')
  if (!!token) {
    nodes.push({
      id: 'Benutzer',
      url: ['Benutzer'],
      sort: [3],
      label: 'Benutzer',
      info: `(${usersCount})`,
      childrenCount: usersCount,
    })
  }
  return nodes
}
