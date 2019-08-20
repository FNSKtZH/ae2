import gql from 'graphql-tag'

export default gql`
  mutation createTaxonomy(
    $type: TaxonomyType!
    $importedBy: UUID!
    $lastUpdated: Date!
  ) {
    createTaxonomy(
      input: {
        taxonomy: {
          type: $type
          importedBy: $importedBy
          lastUpdated: $lastUpdated
        }
      }
    ) {
      taxonomy {
        id
        type
        importedBy
        lastUpdated
      }
    }
  }
`
