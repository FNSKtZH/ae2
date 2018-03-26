// @flow
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

export default graphql(
  gql`
    query exportOnlyRowsWithPropertiesQuery {
      exportOnlyRowsWithProperties @client
    }
  `,
  {
    name: 'exportOnlyRowsWithPropertiesData',
  }
)
