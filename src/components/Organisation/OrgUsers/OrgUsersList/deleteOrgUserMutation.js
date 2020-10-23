import { gql } from '@apollo/client'

export default gql`
  mutation deleteOrganizationUser($id: UUID!) {
    deleteOrganizationUserById(input: { id: $id }) {
      organizationUser {
        id
      }
    }
  }
`
