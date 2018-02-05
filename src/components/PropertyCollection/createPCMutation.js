// @flow
import gql from 'graphql-tag'

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
