// @flow
import { graphql } from 'react-apollo'
import get from 'lodash/get'

import userGql from './userGql'

export default graphql(userGql, {
  options: ({ activeNodeArrayData }) => ({
    variables: {
      name: decodeURIComponent(get(activeNodeArrayData, 'activeNodeArray')[2]),
    },
  }),
  name: 'userData',
})
