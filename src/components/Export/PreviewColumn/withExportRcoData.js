// @flow
import { graphql } from 'react-apollo'
import get from 'lodash/get'
import omit from 'lodash/omit'

import exportRcoDataGql from './exportRcoDataGql'

export default graphql(exportRcoDataGql, {
  options: ({
    exportRcoFiltersData,
    exportRcoPropertiesData,
  }: {
    exportRcoFiltersData: Object,
    exportRcoPropertiesData: Object,
  }) => {
    const rcoFilters = get(exportRcoFiltersData, 'exportRcoFilters', []).map(
      d => omit(d, ['__typename'])
    )
    const rcoProperties = get(exportRcoPropertiesData, 'exportRcoProperties', [])
      .map(d => omit(d, ['__typename']))
    const fetchRcoProperties = rcoProperties.length > 0
    const variables = {
      rcoFilters,
      rcoProperties,
      fetchRcoProperties,
    }

    return { variables }
  },
  name: 'exportRcoData',
})
