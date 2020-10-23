import { gql } from '@apollo/client'

export default gql`
  mutation createPC($importedBy: UUID!, $lastUpdated: Date!) {
    createPropertyCollection(
      input: {
        propertyCollection: {
          importedBy: $importedBy
          lastUpdated: $lastUpdated
        }
      }
    ) {
      propertyCollection {
        id
        importedBy
        lastUpdated
      }
    }
  }
`
