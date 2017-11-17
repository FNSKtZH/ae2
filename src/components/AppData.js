// @flow
import { graphql } from 'react-apollo'

import appQuery from '../modules/appQuery'
import variablesFromStore from '../modules/variablesFromStore'

const AppData = graphql(appQuery, {
  options: ({
    store,
    activeNodeArrayData,
    treeFilterTextData,
  }: {
    store: Object,
    activeNodeArrayData: Object,
    treeFilterTextData: Object,
  }) => ({
    variables: variablesFromStore({
      store,
      activeNodeArrayData,
      treeFilterTextData,
    }),
  }),
})

export default AppData
