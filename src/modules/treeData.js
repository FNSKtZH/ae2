// @flow
import { graphql } from 'react-apollo'
import get from 'lodash/get'

import treeDataGql from './treeDataGql'
import treeDataVariables from './treeDataVariables'

export default graphql(treeDataGql, {
  options: ({ activeNodeArrayData }: { activeNodeArrayData: Object }) => {
    const activeNodeArray = get(activeNodeArrayData, 'activeNodeArray', [])
    const pCId =
      activeNodeArray[0] === 'Eigenschaften-Sammlungen'
        ? activeNodeArray[1]
        : '99999999-9999-9999-9999-999999999999'
    const existsPCId = !!pCId
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
