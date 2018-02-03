// #flow
import updateTaxonomyMutationLr from './updateTaxonomyMutationLr'

export default ({ client, field, taxonomy, value, prevValue }) => {
  if (value !== prevValue) {
    const lastUpdated = new Date()
    const variables = {
      id: taxonomy.id,
      name: field === 'name' ? value : taxonomy.name,
      description: field === 'description' ? value : taxonomy.description,
      links: field === 'links' ? value.split(',') : taxonomy.links,
      organizationId:
        field === 'organizationId' ? value : taxonomy.organizationId,
      lastUpdated,
      importedBy: field === 'importedBy' ? value : taxonomy.importedBy,
      termsOfUse: field === 'termsOfUse' ? value : taxonomy.termsOfUse,
      habitatLabel: field === 'habitatLabel' ? value : taxonomy.habitatLabel,
      habitatComments:
        field === 'habitatComments' ? value : taxonomy.habitatComments,
      habitatNrFnsMin:
        field === 'habitatNrFnsMin' ? value : taxonomy.habitatNrFnsMin,
      habitatNrFnsMax:
        field === 'habitatNrFnsMax' ? value : taxonomy.habitatNrFnsMax,
      type: taxonomy.type,
    }
    client.mutate({
      mutation: updateTaxonomyMutationLr,
      variables,
      optimisticResponse: {
        updateTaxonomyById: {
          taxonomy: {
            id: taxonomy.id,
            name: field === 'name' ? value : taxonomy.name,
            description: field === 'description' ? value : taxonomy.description,
            links: field === 'links' ? value.split(',') : taxonomy.links,
            organizationId:
              field === 'organizationId' ? value : taxonomy.organizationId,
            lastUpdated,
            importedBy: field === 'importedBy' ? value : taxonomy.importedBy,
            termsOfUse: field === 'termsOfUse' ? value : taxonomy.termsOfUse,
            habitatLabel:
              field === 'habitatLabel' ? value : taxonomy.habitatLabel,
            habitatComments:
              field === 'habitatComments' ? value : taxonomy.habitatComments,
            habitatNrFnsMin:
              field === 'habitatNrFnsMin' ? value : taxonomy.habitatNrFnsMin,
            habitatNrFnsMax:
              field === 'habitatNrFnsMax' ? value : taxonomy.habitatNrFnsMax,
            type: taxonomy.type,
            __typename: 'Taxonomy',
          },
          __typename: 'Taxonomy',
        },
        __typename: 'Mutation',
      },
    })
  }
}
