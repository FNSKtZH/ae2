import { gql } from '@apollo/client'

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
