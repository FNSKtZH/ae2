// @flow
import gql from 'graphql-tag'

export default gql`
  query taxQuery($taxId: UUID!) {
    taxonomyById(id: $taxId) {
      id
      name
      description
      links
      lastUpdated
      organizationByOrganizationId {
        id
        name
      }
      isCategoryStandard
      importedBy
      termsOfUse
      habitatLabel
      habitatComments
      habitatNrFnsMin
      habitatNrFnsMax
    }
  }
`
