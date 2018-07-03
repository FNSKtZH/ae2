import gql from 'graphql-tag'

export default gql`
  query exportDataQuery(
    $rcoFilters: [RcoFilterInput]!
    $rcoProperties: [RcoPropertyInput]!
    $fetchRcoProperties: Boolean!
  ) {
    exportRco(rcoFilters: $rcoFilters, rcoProperties: $rcoProperties)
      @include(if: $fetchRcoProperties) {
      totalCount
      nodes {
        id
        propertyCollectionId
        objectId
        objectIdRelation
        objectByObjectIdRelation {
          id
          name
          taxonomyByTaxonomyId {
            id
            name
          }
        }
        propertyCollectionByPropertyCollectionId{
          id
          name
        }
        propertyCollectionOfOrigin
        relationType
        properties
      }
    }
  }
  `