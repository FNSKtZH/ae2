// @flow
import { graphql } from 'react-apollo'
import get from 'lodash/get'

import rCOGql from './rCOGql'

export default graphql(rCOGql, {
  options: ({ activeNodeArrayData }) => ({
    variables: {
      pCId: get(
        activeNodeArrayData,
        'activeNodeArray[1]',
        '99999999-9999-9999-9999-999999999999'
      ),
    },
  }),
  name: 'rCOData',
})
