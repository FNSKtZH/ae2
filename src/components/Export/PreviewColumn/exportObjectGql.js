import gql from 'graphql-tag'

export default gql`
  query Query(
    $exportTaxonomies: [String]!
    $taxFilters: [TaxFilterInput]!
    $fetchTaxProperties: Boolean!
  ) {
    exportObject(exportTaxonomies: $exportTaxonomies, taxFilters: $taxFilters) {
      totalCount
      nodes {
        id
        properties @include(if: $fetchTaxProperties)
      }
    }
  }
`