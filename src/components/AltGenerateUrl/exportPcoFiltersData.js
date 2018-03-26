// @flow
import { graphql } from 'react-apollo'

import exportPcoFiltersGql from './exportPcoFiltersGql'

export default graphql(exportPcoFiltersGql, {
  name: 'exportPcoFiltersData',
})
