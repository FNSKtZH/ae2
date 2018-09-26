// @flow
import { graphql } from 'react-apollo'
import get from 'lodash/get'

import orgUsersGql from './orgUsersGql'

export default graphql(orgUsersGql, {
  options: ({ activeNodeArrayData }) => ({
    variables: {
      name: get(activeNodeArrayData, 'activeNodeArray', ['none', 'none'])[1],
    },
  }),
  name: 'orgUsersData',
})
