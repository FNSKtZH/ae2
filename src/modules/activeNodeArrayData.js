// @flow
import { graphql } from 'react-apollo'

import activeNodeArrayGql from './activeNodeArrayGql'

export default graphql(activeNodeArrayGql, {
  name: 'activeNodeArrayData',
})
