// @flow
export const exportDefaults = {
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
}

const otherDefaults = {
  activeNodeArray: [],
  treeFilter: {
    text: '',
    id: null,
    __typename: 'TreeFilter',
  },
  login: {
    token: '',
    username: '',
    __typename: 'Login',
  },
  historyAfterLogin: '',
}

export default Object.assign({}, exportDefaults, otherDefaults)
