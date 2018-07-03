// @flow
import { graphql } from 'react-apollo'
import get from 'lodash/get'
import omit from 'lodash/omit'

import exportObjectGql from './exportObjectGql'

export default graphql(exportObjectGql, {
  options: ({
    exportTaxonomiesData,
    exportTaxFiltersData,
    exportTaxPropertiesData,
  }: {
    exportTaxonomiesData: Object,
    exportTaxFiltersData: Object,
    exportTaxPropertiesData: Object,
  }) => {
    const exportTaxonomies = get(exportTaxonomiesData, 'exportTaxonomies', [])
    // need to remove __typename because apollo passes it along ?!
    const taxFilters = get(exportTaxFiltersData, 'exportTaxFilters', []).map(
      d => omit(d, ['__typename'])
    )
    const taxProperties = get(exportTaxPropertiesData, 'exportTaxProperties', [])
      .map(d => omit(d, ['__typename']))
    const fetchTaxProperties = taxProperties.length > 0
    const variables = {
      exportTaxonomies,
      taxFilters,
      fetchTaxProperties,
    }

    return { variables }
  },
  name: 'exportObjectData',
})
