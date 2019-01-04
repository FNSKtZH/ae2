// @flow
import gql from 'graphql-tag'

export default gql`
  query propDataQuery(
    $tableName: String!
    $propName: String!
    $pcFieldName: String!
    $pcTableName: String!
    $pcName: String!
    $fetchData: Boolean!
  ) {
    propValuesFunction(
      tableName: $tableName
      propName: $propName
      pcFieldName: $pcFieldName
      pcTableName: $pcTableName
      pcName: $pcName
    ) @include(if: $fetchData) {
      nodes {
        value
      }
    }
  }
`
