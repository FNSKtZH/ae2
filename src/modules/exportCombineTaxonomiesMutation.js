// @flow
import gql from 'graphql-tag'

export default gql`
  mutation setExportCombineTaxonomies($value: Array) {
    setExportCombineTaxonomies(value: $value) @client
  }
`
