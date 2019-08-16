// @flow
import gql from 'graphql-tag'

export default gql`
  mutation upsertPCO(
    $id: UUID
    $objectId: UUID
    $propertyCollectionId: UUID
    $propertyCollectionOfOrigin: UUID
    $properties: JSON
  ) {
    upsertPropertyCollectionObject(
      input: {
        propertyCollectionObject: {
          id: $id
          objectId: $objectId
          propertyCollectionId: $propertyCollectionId
          propertyCollectionOfOrigin: $propertyCollectionOfOrigin
          properties: $properties
        }
      }
    ) {
      propertyCollectionObject {
        id
        objectId
        propertyCollectionId
        propertyCollectionOfOrigin
        properties
      }
    }
  }
`
