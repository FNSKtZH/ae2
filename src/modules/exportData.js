// @flow
import { graphql } from 'react-apollo'
import get from 'lodash/get'

import exportDataGql from './exportDataGql'

export default graphql(exportDataGql, {
  options: ({
    exportTaxonomiesData,
    exportTaxFiltersData,
    exportPcoFiltersData,
    exportRcoFiltersData,
  }: {
    exportTaxonomiesData: Object,
    exportTaxFiltersData: Object,
    exportPcoFiltersData: Object,
    exportRcoFiltersData: Object,
  }) => ({
    variables: {
      exportTaxonomies: get(exportTaxonomiesData, 'exportTaxonomies', []),
      taxFilters: get(exportTaxFiltersData, 'exportTaxFilters', []),
      pcoFilters: get(exportPcoFiltersData, 'exportPcoFilters', []),
      rcoFilters: get(exportRcoFiltersData, 'exportRcoFilters', []),
    },
  }),
  name: 'exportData',
})
