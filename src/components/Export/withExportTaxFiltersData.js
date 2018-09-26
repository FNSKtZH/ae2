// @flow
import { graphql } from 'react-apollo'

import exportTaxFiltersGql from './exportTaxFiltersGql'

export default graphql(exportTaxFiltersGql, {
  name: 'exportTaxFiltersData',
})
