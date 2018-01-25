// @flow
import gql from 'graphql-tag'

export default gql`
  mutation updateOrganizationUser(
    $organizationId: UUID!
    $userId: UUID
    $role: String
    $nodeId: ID!
  ) {
    updateOrganizationUser(
      input: {
        nodeId: $nodeId
        organizationUserPatch: {
          organizationId: $organizationId
          userId: $userId
          role: $role
        }
      }
    ) {
      organizationUser {
        nodeId
        id
        organizationId
        userId
        role
      }
    }
  }
`
