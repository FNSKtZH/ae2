// @flow
export const exportDefaults = {
  activeNodeArray: [],
  exportCategories: [],
  exportTaxonomies: [],
  exportTaxProperties: [],
  exportPcoProperties: [],
  exportRcoProperties: [],
  exportTaxFilters: [],
  exportPcoFilters: [],
  exportRcoFilters: [],
  exportOnlyRowsWithProperties: true,
  exportTooManyProperties: false,
  exportWithSynonymData: true,
}

const otherDefaults = {
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
