// @flow
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

export default graphql(
  gql`
    {
      exportRcoInOneRow @client
      exportRcoProperties @client {
        pcname
        relationtype
      }
    }
  `,
)
