// @flow
import { graphql } from 'react-apollo'
import get from 'lodash/get'

import userGql from './userGql'

export default graphql(userGql, {
  options: ({ activeNodeArrayData }) => ({
    variables: {
      id:
        get(activeNodeArrayData, 'activeNodeArray', [])[1] ||
        '99999999-9999-9999-9999-999999999999',
    },
  }),
  name: 'userData',
})
