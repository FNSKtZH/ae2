// @flow
import { graphql } from 'react-apollo'

import query from './allUsersDataGql'

export default graphql(query, {
  name: 'allUsersData',
})
