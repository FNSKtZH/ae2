import { gql } from '@apollo/client'

export default gql`
  mutation deletePcoOfPc($pcId: UUID!) {
    deletePcoOfPc(input: { pcId: $pcId }) {
      taxonomies {
        id
      }
    }
  }
`
