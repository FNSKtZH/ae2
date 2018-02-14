// @flow
import gql from 'graphql-tag'

export default gql`
  mutation updatePC(
    $oldId: UUID!
    $id: UUID!
    $name: String
    $description: String
    $links: [String]
    $combining: Boolean
    $organizationId: UUID
    $lastUpdated: Date
    $termsOfUse: String
    $importedBy: UUID
  ) {
    updatePropertyCollectionById(
      input: {
        id: $oldId
        propertyCollectionPatch: {
          id: $id
          name: $name
          description: $description
          links: $links
          combining: $combining
          organizationId: $organizationId
          lastUpdated: $lastUpdated
          termsOfUse: $termsOfUse
          importedBy: $importedBy
        }
      }
    ) {
      propertyCollection {
        id
        name
        description
        links
        combining
        organizationId
        lastUpdated
        termsOfUse
        importedBy
      }
    }
  }
`
