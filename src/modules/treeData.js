// @flow
import { graphql } from 'react-apollo'

import treeDataGql from './treeDataGql'
import treeDataVariables from './treeDataVariables'

export default graphql(treeDataGql, {
  options: ({ activeNodeArrayData }: { activeNodeArrayData: Object }) => ({
    variables: treeDataVariables({
      activeNodeArrayData,
    }),
  }),
  name: 'treeData',
})
