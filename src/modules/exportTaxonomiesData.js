// @flow
import { graphql } from 'react-apollo'

import exportTaxonomiesGql from './exportTaxonomiesGql'

export default graphql(exportTaxonomiesGql, {
  name: 'exportTaxonomiesData',
})
