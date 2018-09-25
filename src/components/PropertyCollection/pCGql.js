// @flow
import gql from 'graphql-tag'

export default gql`
  query pCQuery($pCId: UUID!) {
    propertyCollectionById(id: $pCId) {
      id
      name
      description
      links
      combining
      organizationId
      lastUpdated
      termsOfUse
      importedBy
      organizationByOrganizationId {
        id
        name
      }
      propertyCollectionObjectsByPropertyCollectionId {
        totalCount
      }
    }
    # leave this as is only called once more and with more props
    allPropertyCollections {
      nodes {
        id
        name
      }
    }
  }
`
