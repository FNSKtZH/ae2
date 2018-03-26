// @flow
import gql from 'graphql-tag'

export default gql`
  mutation resetExportTaxProperties {
    resetExportTaxProperties @client
  }
`
