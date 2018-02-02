// @flow
import gql from 'graphql-tag'

export default gql`
  mutation updateTaxonomy(
    $id: UUID!
    $name: String
    $description: String
    $links: [String]
    $organizationId: UUID
    $lastUpdated: Date
    $importedBy: UUID
    $termsOfUse: String
    $type: TaxonomyType
    $habitatLabel: String
    $habitatComments: String
    $habitatNrFnsMin: Int
    $habitatNrFnsMax: Int
  ) {
    updateTaxonomyById(
      input: {
        id: $id
        taxonomyPatch: {
          name: $name
          description: $description
          links: $links
          organizationId: $organizationId
          lastUpdated: $lastUpdated
          importedBy: $importedBy
          termsOfUse: $termsOfUse
          type: $type
          habitatLabel: $habitatLabel
          habitatComments: $habitatComments
          habitatNrFnsMin: $habitatNrFnsMin
          habitatNrFnsMax: $habitatNrFnsMax
        }
      }
    ) {
      taxonomy {
        id
        name
        description
        links
        organizationId
        lastUpdated
        importedBy
        termsOfUse
        type
        habitatLabel
        habitatComments
        habitatNrFnsMin
        habitatNrFnsMax
      }
    }
  }
`
