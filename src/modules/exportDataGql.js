// @flow

import gql from 'graphql-tag'

export default gql`
  query exportDataQuery(
    $exportTaxonomies: [String]!
    $taxFilters: [TaxFilterInput]!
    $pcoFilters: [PcoFilterInput]!
    $rcoFilters: [RcoFilterInput]!
  ) {
    exportObject(
      exportTaxonomies: $exportTaxonomies
      taxFilters: $taxFilters
      pcoFilters: $pcoFilters
      rcoFilters: $rcoFilters
    ) {
      totalCount
      nodes {
        id
        name
        properties
      }
    }
    exportPco(
      exportTaxonomies: $exportTaxonomies
      taxFilters: $taxFilters
      pcoFilters: $pcoFilters
    ) {
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
    ) {
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
    ) {
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
    ) {
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
