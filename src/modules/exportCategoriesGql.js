// @flow
import gql from 'graphql-tag'

export default gql`
  query exportCategoriesQuery {
    exportCategories @client
  }
`
