// @flow
export const exportDefaults = {
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
