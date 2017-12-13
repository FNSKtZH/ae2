// @flow

import gql from 'graphql-tag'

export default gql`
  query exportDataQuery(
    $exportTaxonomies: [String]!
    $taxFilters: [TaxFilterInput]!
    $pcoFilters: [PcoFilterInput]!
    $rcoFilters: [RcoFilterInput]!
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
    ) @include(if: $fetchTaxProperties) {
      totalCount
      nodes {
        id
        properties
      }
    }
    exportPco(
      exportTaxonomies: $exportTaxonomies
      taxFilters: $taxFilters
      pcoFilters: $pcoFilters
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
      rcoFilters: $rcoFilters
    ) @include(if: $fetchRcoProperties) {
      totalCount
      nodes {
        id
        objectId
        relationType
        properties
      }
    }
    exportSynonymRco(
      exportTaxonomies: $exportTaxonomies
      taxFilters: $taxFilters
      rcoFilters: $rcoFilters
    ) @include(if: $fetchSynonymRcoProperties) {
      totalCount
      nodes {
        id
        objectId
        relationType
        properties
      }
    }
  }
`
