// @flow
import gql from 'graphql-tag'

export default gql`
  mutation createTaxonomy {
    createTaxonomy(input: { taxonomy: {} }) {
      taxonomy {
        id
      }
    }
  }
`
