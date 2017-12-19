// @flow
import { graphql } from 'react-apollo'
import get from 'lodash/get'

import pCGql from './pCGql'

export default graphql(pCGql, {
  options: ({ activeNodeArrayData }) => ({
    variables: {
      pCId: get(
        activeNodeArrayData,
        'activeNodeArray[1]',
        '99999999-9999-9999-9999-999999999999'
      ),
    },
  }),
  name: 'pCData',
})
