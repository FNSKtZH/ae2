// @flow
import gql from 'graphql-tag'

export default gql`
  mutation resetExportRcoProperties {
    resetExportRcoProperties @client
  }
`
