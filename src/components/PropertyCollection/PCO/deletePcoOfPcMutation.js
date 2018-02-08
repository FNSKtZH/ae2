// @flow
import gql from 'graphql-tag'

export default gql`
  mutation deletePcoOfPc($pcId: UUID!) {
    deletePcoOfPc(input: { pcId: $pcId }) {
      taxonomies {
        id
      }
    }
  }
`
