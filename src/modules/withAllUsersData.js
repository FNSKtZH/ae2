// @flow
import { graphql } from 'react-apollo'

import query from './allUsersData.graphql'

export default graphql(query, {
  name: 'allUsersData',
})
