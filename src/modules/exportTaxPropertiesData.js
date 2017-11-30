// @flow
import { graphql } from 'react-apollo'

import exportTaxPropertiesGql from './exportTaxPropertiesGql'

export default graphql(exportTaxPropertiesGql, {
  name: 'exportTaxPropertiesData',
})
