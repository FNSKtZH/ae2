// @flow
import gql from 'graphql-tag'

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
