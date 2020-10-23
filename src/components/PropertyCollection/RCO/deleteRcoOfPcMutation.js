import { gql } from '@apollo/client'

export default gql`
  mutation deleteRcoOfPc($pcId: UUID!) {
    deleteRcoOfPc(input: { pcId: $pcId }) {
      taxonomies {
        id
      }
    }
  }
`
