// @flow
import gql from 'graphql-tag'

export default gql`
  mutation resetExportPcoProperties {
    resetExportPcoProperties @client
  }
`
