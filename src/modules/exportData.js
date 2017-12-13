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
    exportTaxPropertiesData,
    exportPcoPropertiesData,
    exportRcoPropertiesData,
    exportWithSynonymDataData,
  }: {
    exportTaxonomiesData: Object,
    exportTaxFiltersData: Object,
    exportPcoFiltersData: Object,
    exportRcoFiltersData: Object,
    exportTaxPropertiesData: Object,
    exportPcoPropertiesData: Object,
    exportRcoPropertiesData: Object,
    exportWithSynonymDataData: Object,
  }) => {
    const exportWithSynonymData = get(
      exportWithSynonymDataData,
      'exportWithSynonymData',
      true
    )
    const exportTaxonomies = get(exportTaxonomiesData, 'exportTaxonomies', [])
    const taxFilters = get(exportTaxFiltersData, 'exportTaxFilters', [])
    const pcoFilters = get(exportPcoFiltersData, 'exportPcoFilters', [])
    const rcoFilters = get(exportRcoFiltersData, 'exportRcoFilters', [])
    const taxProperties = get(
      exportTaxPropertiesData,
      'exportTaxProperties',
      []
    )
    const pcoProperties = get(
      exportPcoPropertiesData,
      'exportPcoProperties',
      []
    )
    const rcoProperties = get(
      exportRcoPropertiesData,
      'exportRcoProperties',
      []
    )
    const fetchTaxProperties = taxProperties.length > 0
    const fetchPcoProperties = pcoProperties.length > 0
    const fetchRcoProperties = rcoProperties.length > 0
    const fetchSynonymPcoProperties =
      exportWithSynonymData && pcoProperties.length > 0
    const fetchSynonymRcoProperties =
      exportWithSynonymData && rcoProperties.length > 0

    return {
      variables: {
        exportTaxonomies,
        taxFilters,
        pcoFilters,
        rcoFilters,
        pcoProperties,
        rcoProperties,
        fetchTaxProperties,
        fetchPcoProperties,
        fetchRcoProperties,
        fetchSynonymPcoProperties,
        fetchSynonymRcoProperties,
      },
    }
  },
  name: 'exportData',
})
