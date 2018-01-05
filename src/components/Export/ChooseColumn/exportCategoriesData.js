// @flow
import { graphql } from 'react-apollo'

import exportCategoriesGql from './exportCategoriesGql'

export default graphql(exportCategoriesGql, {
  name: 'exportCategoriesData',
})
