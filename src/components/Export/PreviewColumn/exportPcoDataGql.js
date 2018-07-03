import gql from 'graphql-tag'

export default gql`
  query exportDataQuery(
    $pcoFilters: [PcoFilterInput]!
    $pcoProperties: [PcoPropertyInput]!
    $fetchPcoProperties: Boolean!
  ) {
    exportPco(pcoFilters: $pcoFilters, pcoProperties: $pcoProperties)
      @include(if: $fetchPcoProperties) {
      totalCount
      nodes {
        id
        objectId
        propertyCollectionId
        propertyCollectionOfOrigin
        properties
      }
    }
  }
`