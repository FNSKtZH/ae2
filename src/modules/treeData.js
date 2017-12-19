// @flow
import { graphql } from 'react-apollo'
import get from 'lodash/get'

import treeDataGql from './treeDataGql'
import treeDataVariables from './treeDataVariables'

export default graphql(treeDataGql, {
  options: ({ activeNodeArrayData }: { activeNodeArrayData: Object }) => {
    const activeNodeArray = get(activeNodeArrayData, 'activeNodeArray', [])
    let pCId = '99999999-9999-9999-9999-999999999999'
    if (
      activeNodeArray[0] === 'Eigenschaften-Sammlungen' &&
      activeNodeArray[1]
    ) {
      pCId = activeNodeArray[1]
    }
    const existsPCId = pCId !== '99999999-9999-9999-9999-999999999999'
    const variables = {
      ...treeDataVariables({
        activeNodeArray,
      }),
      pCId,
      existsPCId,
    }

    return {
      variables,
    }
  },
  name: 'treeData',
})
