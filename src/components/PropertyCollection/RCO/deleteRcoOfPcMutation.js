// @flow
import gql from 'graphql-tag'

export default gql`
  mutation deleteRcoOfPc($pcId: UUID!) {
    deleteRcoOfPc(input: { pcId: $pcId }) {
      taxonomies {
        id
      }
    }
  }
`
