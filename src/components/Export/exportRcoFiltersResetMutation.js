// @flow
import gql from 'graphql-tag'

export default gql`
  mutation resetExportRcoFilters {
    resetExportRcoFilters @client
  }
`
