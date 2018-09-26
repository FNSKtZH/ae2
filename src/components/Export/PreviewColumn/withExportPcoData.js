// @flow
import { graphql } from 'react-apollo'
import get from 'lodash/get'
import omit from 'lodash/omit'

import exportPcoData from './exportPcoDataGql'

export default graphql(exportPcoData, {
  options: ({
    exportPcoFiltersData,
    exportPcoPropertiesData,
  }: {
    exportPcoFiltersData: Object,
    exportPcoPropertiesData: Object,
  }) => {
    const pcoFilters = get(exportPcoFiltersData, 'exportPcoFilters', []).map(
      d => omit(d, ['__typename'])
    )
    const pcoProperties = get(exportPcoPropertiesData, 'exportPcoProperties', [])
      .map(d => omit(d, ['__typename']))
    const fetchPcoProperties = pcoProperties.length > 0
    const variables = {
      pcoFilters,
      pcoProperties,
      fetchPcoProperties,
    }

    return { variables }
  },
  name: 'exportPcoData',
})
