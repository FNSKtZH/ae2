import { gql } from '@apollo/client'

export default gql`
  mutation updatePCO(
    $id: UUID!
    $objectId: UUID
    $propertyCollectionId: UUID
    $propertyCollectionOfOrigin: UUID
    $properties: JSON
  ) {
    updatePropertyCollectionObjectById(
      input: {
        id: $id
        propertyCollectionObjectPatch: {
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
