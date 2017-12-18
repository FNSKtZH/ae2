// @flow
import { graphql } from 'react-apollo'

import pCGql from './pCGql'

export default graphql(pCGql, {
  options: ({ activeNodeArrayData }) => {
    const { activeNodeArray } = activeNodeArrayData
    const pCId = activeNodeArray[1]

    return {
      variables: {
        pCId,
      },
    }
  },
  name: 'pCData',
})
