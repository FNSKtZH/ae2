// @flow
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import get from 'lodash/get'

export default graphql(
  gql`
    query rowQuery($username: String!) {
      userByName(name: $username) {
        id
      }
    }
  `,
  {
    options: ({ loginData }) => ({
      variables: {
        username: get(loginData, 'login.username', null),
      },
    }),
    name: 'rowData',
  }
)
