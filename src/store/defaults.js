// @flow
export const exportDefaults = {
  'exportTypes@client': [],
  'exportTaxonomies@client': [],
  'exportIds@client': [],
  'exportTaxProperties@client': [],
  'exportPcoProperties@client': [],
  'exportRcoProperties@client': [],
  'exportTaxFilters@client': [],
  'exportPcoFilters@client': [],
  'exportRcoFilters@client': [],
  'exportOnlyRowsWithProperties@client': true,
  'exportWithSynonymData@client': true,
  'exportTooManyProperties@client': false,
  'editingTaxonomies@client': false,
}

const otherDefaults = {
  'activeNodeArray@client': [],
  'treeFilter@client': {
    text: '',
    id: null,
    __typename: 'TreeFilter',
  },
  'login@client': {
    token: '',
    username: '',
    __typename: 'Login',
  },
  'historyAfterLogin@client': '',
}

export default Object.assign({}, exportDefaults, otherDefaults)
