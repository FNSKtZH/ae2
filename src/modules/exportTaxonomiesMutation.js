// @flow
import gql from 'graphql-tag'

export default gql`
  mutation setExportTaxonomies($value: Array) {
    setExportTaxonomies(value: $value) @client
  }
`
