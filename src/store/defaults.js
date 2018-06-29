// @flow
import get from 'lodash/get'

export default async idb => {
  // fetch user from idb
  const user = await idb.users.toArray()

  const defaults = {
    exportType: null,
    exportTaxonomies: [],
    exportIds: [],
    exportTaxProperties: [],
    exportPcoProperties: [],
    exportRcoProperties: [],
    exportTaxFilters: [],
    exportPcoFilters: [],
    exportRcoFilters: [],
    exportOnlyRowsWithProperties: true,
    exportWithSynonymData: true,
    exportTooManyProperties: false,
    exportAddFilterFields: true,
    exportRcoInOneRow: true,
    editingTaxonomies: false,
    editingPCs: false,
    updateAvailable: false,
    activeNodeArray: [],
    treeFilter: {
      text: '',
      id: null,
      __typename: 'TreeFilter',
    },
    login: {
      token: get(user, '[0].token', null),
      username: get(user, '[0].username', ''),
      __typename: 'Login',
    },
    historyAfterLogin: '',
  }

  return defaults
}
