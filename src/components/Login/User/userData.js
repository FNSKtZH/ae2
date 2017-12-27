// @flow
import { graphql } from 'react-apollo'
import get from 'lodash/get'

import userGql from './userGql'

export default graphql(userGql, {
  options: ({ loginData }) => ({
    variables: {
      name: get(loginData, 'login.username'),
    },
  }),
  name: 'userData',
})
