// @flow
import gql from 'graphql-tag'

export default gql`
  mutation resetExportTaxFilters {
    resetExportTaxFilters @client
  }
`
