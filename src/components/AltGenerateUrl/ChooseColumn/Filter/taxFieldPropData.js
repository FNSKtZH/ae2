// @flow
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

export default graphql(
  gql`
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
  `,
  {
    options: ({ taxname, pname, fetchData }) => ({
      variables: {
        tableName: 'object',
        propName: pname,
        pcFieldName: 'taxonomy_id',
        pcTableName: 'taxonomy',
        pcName: taxname,
        fetchData,
      },
    }),
    name: 'propData',
  }
)
