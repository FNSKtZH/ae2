// @flow

import gql from 'graphql-tag'

export default gql`
  query exportDataQuery(
    $exportTaxonomies: [String]!
    $taxFilters: [TaxFilterInput]!
    $pcoFilters: [PcoFilterInput]!
    $rcoFilters: [RcoFilterInput]!
    $pcoProperties: [PcoPropertyInput]!
    $rcoProperties: [RcoPropertyInput]!
    $fetchTaxProperties: Boolean!
    $fetchPcoProperties: Boolean!
    $fetchRcoProperties: Boolean!
    $considersynonyms: Boolean!
  ) {
    allSynonyms @include(if: $considersynonyms) {
      nodes {
        objectId
        objectIdSynonym
      }
    }
    exportObject(
      exportTaxonomies: $exportTaxonomies
      taxFilters: $taxFilters
    ) {
      totalCount
      nodes {
        id
        properties @include(if: $fetchTaxProperties)
      }
    }
    exportPco(
      pcoFilters: $pcoFilters
      pcoProperties: $pcoProperties
    ) @include(if: $fetchPcoProperties) {
      totalCount
      nodes {
        id
        objectId
        propertyCollectionId
        propertyCollectionOfOrigin
        properties
      }
    }
    exportRco(
      rcoFilters: $rcoFilters
      rcoProperties: $rcoProperties
    ) @include(if: $fetchRcoProperties) {
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
        propertyCollectionOfOrigin
        relationType
        properties
      }
    }
  }
`
