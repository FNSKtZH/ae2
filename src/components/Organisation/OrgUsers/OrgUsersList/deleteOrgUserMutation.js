// @flow
import gql from 'graphql-tag'

export default gql`
  mutation deleteOrganizationUser($id: UUID!) {
    deleteOrganizationUserById(input: { id: $id }) {
      organizationUser {
        id
      }
    }
  }
`
