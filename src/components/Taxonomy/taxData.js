// @flow
import { graphql } from 'react-apollo'
import get from 'lodash/get'

import taxGql from './taxGql'

export default graphql(taxGql, {
  options: ({ activeNodeArrayData }) => ({
    variables: {
      taxId: get(
        activeNodeArrayData,
        'activeNodeArray[2]',
        '99999999-9999-9999-9999-999999999999'
      ),
    },
  }),
  name: 'taxData',
})
