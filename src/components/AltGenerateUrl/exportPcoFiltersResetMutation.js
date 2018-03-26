// @flow
import gql from 'graphql-tag'

export default gql`
  mutation resetExportPcoFilters {
    resetExportPcoFilters @client
  }
`
