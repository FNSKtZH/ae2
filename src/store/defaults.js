// @flow
export default {
  activeNodeArray: [],
  exportCategories: [],
  exportTaxonomies: [],
  exportTaxProperties: [],
  exportPcoProperties: [],
  exportRcoProperties: [],
  exportTaxFilters: [],
  exportPcoFilters: [],
  exportRcoFilters: [],
  exportTooManyProperties: false,
  exportWithSynonymData: true,
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
