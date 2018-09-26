// @flow
import { graphql } from 'react-apollo'

import exportRcoFiltersGql from './exportRcoFiltersGql'

export default graphql(exportRcoFiltersGql, {
  name: 'exportRcoFiltersData',
})
