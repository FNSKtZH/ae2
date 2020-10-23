import { gql } from '@apollo/client'

export default gql`
  mutation createOrganizationUser($organizationId: UUID!) {
    createOrganizationUser(
      input: { organizationUser: { organizationId: $organizationId } }
    ) {
      organizationUser {
        organizationId
      }
    }
  }
`
