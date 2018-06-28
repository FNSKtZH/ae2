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
    $fetchSynonymPcoProperties: Boolean!
    $fetchSynonymRcoProperties: Boolean!
    $considersynonyms: Boolean!
  ) {
    exportObject(
      exportTaxonomies: $exportTaxonomies
      taxFilters: $taxFilters
      pcoFilters: $pcoFilters
      rcoFilters: $rcoFilters
      considersynonyms: $considersynonyms
    ) {
      totalCount
      nodes {
        id
        properties @include(if: $fetchTaxProperties)
      }
    }
    exportPco(
      exportTaxonomies: $exportTaxonomies
      taxFilters: $taxFilters
      pcoFilters: $pcoFilters
      rcoFilters: $rcoFilters
      pcoProperties: $pcoProperties
      considersynonyms: $considersynonyms
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
    exportSynonymPco(
      exportTaxonomies: $exportTaxonomies
      taxFilters: $taxFilters
      pcoFilters: $pcoFilters
      rcoFilters: $rcoFilters
      pcoProperties: $pcoProperties
      considersynonyms: $considersynonyms
    ) @include(if: $fetchSynonymPcoProperties) {
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
      exportTaxonomies: $exportTaxonomies
      taxFilters: $taxFilters
      pcoFilters: $pcoFilters
      rcoFilters: $rcoFilters
      rcoProperties: $rcoProperties
      considersynonyms: $considersynonyms
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
    exportSynonymRco(
      exportTaxonomies: $exportTaxonomies
      taxFilters: $taxFilters
      pcoFilters: $pcoFilters
      rcoFilters: $rcoFilters
      rcoProperties: $rcoProperties
      considersynonyms: $considersynonyms
    ) @include(if: $fetchSynonymRcoProperties) {
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
