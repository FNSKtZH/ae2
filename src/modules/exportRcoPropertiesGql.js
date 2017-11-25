// @flow
import gql from 'graphql-tag'

export default gql`
  query exportRcoPropertiesQuery {
    exportRcoProperties @client {
      pCName
      pName
    }
  }
`
