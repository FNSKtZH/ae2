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
  ) {
    exportObject(
      exportTaxonomies: $exportTaxonomies
      taxFilters: $taxFilters
      pcoFilters: $pcoFilters
      rcoFilters: $rcoFilters
    ) {
      totalCount
      nodes @include(if: $fetchTaxProperties) {
        id
        properties
      }
    }
    exportPco(
      exportTaxonomies: $exportTaxonomies
      taxFilters: $taxFilters
      pcoFilters: $pcoFilters
      rcoFilters: $rcoFilters
      pcoProperties: $pcoProperties
    ) @include(if: $fetchPcoProperties) {
      totalCount
      nodes {
        id
        objectId
        properties
      }
    }
    exportSynonymPco(
      exportTaxonomies: $exportTaxonomies
      taxFilters: $taxFilters
      pcoFilters: $pcoFilters
      rcoFilters: $rcoFilters
      pcoProperties: $pcoProperties
    ) @include(if: $fetchSynonymPcoProperties) {
      totalCount
      nodes {
        id
        objectId
        properties
      }
    }
    exportRco(
      exportTaxonomies: $exportTaxonomies
      taxFilters: $taxFilters
      pcoFilters: $pcoFilters
      rcoFilters: $rcoFilters
      rcoProperties: $rcoProperties
    ) @include(if: $fetchRcoProperties) {
      totalCount
      nodes {
        id
        objectId
        objectByObjectIdRelation {
          id
          name
          taxonomyByTaxonomyId {
            id
            name
          }
        }
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
    ) @include(if: $fetchSynonymRcoProperties) {
      totalCount
      nodes {
        id
        objectId
        objectByObjectIdRelation {
          id
          name
          taxonomyByTaxonomyId {
            id
            name
          }
        }
        relationType
        properties
      }
    }
  }
`
