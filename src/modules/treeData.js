// @flow
import { graphql } from 'react-apollo'
import get from 'lodash/get'

import treeDataGql from './treeDataGql'
import treeDataVariables from './treeDataVariables'

export default graphql(treeDataGql, {
  options: ({ activeNodeArrayData }: { activeNodeArrayData: Object }) => {
    const activeNodeArray = get(activeNodeArrayData, 'activeNodeArray', [])
    const variables = treeDataVariables({
      activeNodeArray,
    })

    return {
      variables,
    }
  },
  name: 'treeData',
})
