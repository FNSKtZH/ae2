// @flow
import { graphql } from 'react-apollo'
import get from 'lodash/get'
import omit from 'lodash/omit'

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
    // need to remove __typename because apollo passes it along ?!
    const taxFilters = get(exportTaxFiltersData, 'exportTaxFilters', []).map(
      d => omit(d, ['__typename'])
    )
    const pcoFilters = get(exportPcoFiltersData, 'exportPcoFilters', []).map(
      d => omit(d, ['__typename'])
    )
    const rcoFilters = get(exportRcoFiltersData, 'exportRcoFilters', []).map(
      d => omit(d, ['__typename'])
    )
    const taxProperties = get(
      exportTaxPropertiesData,
      'exportTaxProperties',
      []
    ).map(d => omit(d, ['__typename']))
    const pcoProperties = get(
      exportPcoPropertiesData,
      'exportPcoProperties',
      []
    ).map(d => omit(d, ['__typename']))
    const rcoProperties = get(
      exportRcoPropertiesData,
      'exportRcoProperties',
      []
    ).map(d => omit(d, ['__typename']))
    const fetchTaxProperties = taxProperties.length > 0
    const fetchPcoProperties = pcoProperties.length > 0
    const fetchRcoProperties = rcoProperties.length > 0
    const fetchSynonymPcoProperties =
      exportWithSynonymData && pcoProperties.length > 0
    const fetchSynonymRcoProperties =
      exportWithSynonymData && rcoProperties.length > 0
    const variables = {
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
    }

    return {
      variables,
    }
  },
  name: 'exportData',
})
