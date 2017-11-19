// @flow
import gql from 'graphql-tag'

export default gql`
  query exportCombineTaxonomiesQuery {
    exportCombineTaxonomies @client
  }
`
