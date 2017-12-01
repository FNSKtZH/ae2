// @flow
import { graphql } from 'react-apollo'

import treeDataGql from './treeDataGql'
import variablesFromStore from './variablesFromStore'

export default graphql(treeDataGql, {
  options: ({ activeNodeArrayData }: { activeNodeArrayData: Object }) => ({
    variables: variablesFromStore({
      activeNodeArrayData,
    }),
  }),
  name: 'treeData',
})
