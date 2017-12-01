// @flow
import { graphql } from 'react-apollo'

import treeFilterGql from './treeFilterGql'

export default graphql(treeFilterGql, {
  name: 'treeFilterData',
})
