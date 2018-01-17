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
      $pcName: String
    ) {
      propValuesFunction(
        tableName: $tableName
        propName: $propName
        pcFieldName: $pcFieldName
        pcTableName: $pcTableName
        pcName: $pcName
      ) {
        nodes {
          value
        }
      }
    }
  `,
  {
    options: ({ pcname, pname }) => ({
      variables: {
        tableName: 'property_collection_object',
        propName: pname,
        pcFieldName: 'property_collection_id',
        pcTableName: 'property_collection',
        pcName: pcname,
      },
    }),
    name: 'propData',
  }
)
