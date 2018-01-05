// @flow
import gql from 'graphql-tag'

export default gql`
  query exportPcoPropertiesQuery {
    exportPcoProperties @client {
      pcname
      pname
    }
  }
`
