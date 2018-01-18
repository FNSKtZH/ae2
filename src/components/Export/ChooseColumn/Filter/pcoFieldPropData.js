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
    options: ({ pcname, pname, fetchData }) => ({
      variables: {
        tableName: 'property_collection_object',
        propName: pname,
        pcFieldName: 'property_collection_id',
        pcTableName: 'property_collection',
        pcName: pcname,
        fetchData,
      },
    }),
    name: 'propData',
  }
)
