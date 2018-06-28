// @flow
import { graphql } from 'react-apollo'
import get from 'lodash/get'
import omit from 'lodash/omit'

import exportDataGql from './exportData.graphql'

export default graphql(exportDataGql, {
  options: ({
    exportPcoFiltersData,
    exportRcoFiltersData,
    exportPcoPropertiesData,
    exportRcoPropertiesData,
  }: {
    exportPcoFiltersData: Object,
    exportRcoFiltersData: Object,
    exportPcoPropertiesData: Object,
    exportRcoPropertiesData: Object,
  }) => {
    const pcoFilters = get(exportPcoFiltersData, 'exportPcoFilters', []).map(
      d => omit(d, ['__typename'])
    )
    const rcoFilters = get(exportRcoFiltersData, 'exportRcoFilters', []).map(
      d => omit(d, ['__typename'])
    )
    const pcoProperties = get(exportPcoPropertiesData, 'exportPcoProperties', [])
      .map(d => omit(d, ['__typename']))
    const rcoProperties = get(exportRcoPropertiesData, 'exportRcoProperties', [])
      .map(d => omit(d, ['__typename']))
    const fetchPcoProperties = pcoProperties.length > 0
    const fetchRcoProperties = rcoProperties.length > 0
    const variables = {
      pcoFilters,
      rcoFilters,
      pcoProperties,
      rcoProperties,
      fetchPcoProperties,
      fetchRcoProperties,
    }

    return { variables }
  },
  name: 'exportData',
})
