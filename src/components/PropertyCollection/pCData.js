// @flow
import { graphql } from 'react-apollo'

import pCGql from './pCGql'

export default graphql(pCGql, {
  options: ({ activeNodeArrayData }) => {
    const { activeNodeArray } = activeNodeArrayData
    const pCId = activeNodeArray[1] || '99999999-9999-9999-9999-999999999999'

    return {
      variables: {
        pCId,
      },
    }
  },
  name: 'pCData',
})
