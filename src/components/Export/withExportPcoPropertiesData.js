// @flow
import { graphql } from 'react-apollo'

import exportPcoPropertiesGql from './exportPcoPropertiesGql'

export default graphql(exportPcoPropertiesGql, {
  name: 'exportPcoPropertiesData',
})
