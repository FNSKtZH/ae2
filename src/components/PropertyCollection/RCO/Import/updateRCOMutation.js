import { gql } from '@apollo/client'

export default gql`
  mutation updateRCO(
    $id: UUID!
    $objectId: UUID!
    $objectIdRelation: UUID!
    $propertyCollectionId: UUID!
    $propertyCollectionOfOrigin: UUID
    $relationType: String!
    $properties: JSON
  ) {
    updateRelationById(
      input: {
        id: $id
        relationPatch: {
          objectId: $objectId
          objectIdRelation: $objectIdRelation
          propertyCollectionId: $propertyCollectionId
          propertyCollectionOfOrigin: $propertyCollectionOfOrigin
          relationType: $relationType
          properties: $properties
        }
      }
    ) {
      relation {
        id
        objectId
        objectIdRelation
        propertyCollectionId
        propertyCollectionOfOrigin
        relationType
        properties
      }
    }
  }
`
