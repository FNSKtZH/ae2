// @flow
export const exportDefaults = {
  exportCategories: [],
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
    role: '',
    username: '',
    __typename: 'Login',
  },
  historyAfterLogin: '',
}

export default Object.assign({}, exportDefaults, otherDefaults)
