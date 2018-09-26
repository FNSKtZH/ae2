// @flow
import { graphql } from 'react-apollo'

import exportRcoPropertiesGql from './exportRcoPropertiesGql'

export default graphql(exportRcoPropertiesGql, {
  name: 'exportRcoPropertiesData',
})
