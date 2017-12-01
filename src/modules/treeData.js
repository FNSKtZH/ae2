// @flow
import { graphql } from 'react-apollo'

import appQuery from './appQuery'
import variablesFromStore from './variablesFromStore'

export default graphql(appQuery, {
  options: ({ activeNodeArrayData }: { activeNodeArrayData: Object }) => ({
    variables: variablesFromStore({
      activeNodeArrayData,
    }),
  }),
  name: 'treeData',
})
