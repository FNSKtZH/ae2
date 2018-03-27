// #flow
import app from 'ampersand-app'

import updatePCMutation from './updatePCMutation'

export default async ({ client, field, pC, value, prevValue, setError }) => {
  //setError(null)
  if (value !== prevValue) {
    const variables = {
      oldId: pC.id,
      id: field === 'id' ? value : pC.id,
      name: field === 'name' ? value : pC.name,
      description: field === 'description' ? value : pC.description,
      links: field === 'links' ? value.split(',') : pC.links,
      combining: field === 'combining' ? value : pC.combining,
      organizationId: field === 'organizationId' ? value : pC.organizationId,
      lastUpdated: field === 'lastUpdated' ? value : pC.lastUpdated,
      importedBy: field === 'importedBy' ? value : pC.importedBy,
      termsOfUse: field === 'termsOfUse' ? value : pC.termsOfUse,
    }
    try {
      // TODO
      // if id is updated, use different mutation
      await client.mutate({
        mutation: updatePCMutation,
        variables,
        optimisticResponse: {
          updatePropertyCollectionById: {
            propertyCollection: {
              oldId: pC.id,
              id: field === 'id' ? value : pC.id,
              name: field === 'name' ? value : pC.name,
              description: field === 'description' ? value : pC.description,
              links: field === 'links' ? value.split(',') : pC.links,
              combining: field === 'combining' ? value : pC.combining,
              organizationId:
                field === 'organizationId' ? value : pC.organizationId,
              lastUpdated: field === 'lastUpdated' ? value : pC.lastUpdated,
              importedBy: field === 'importedBy' ? value : pC.importedBy,
              termsOfUse: field === 'termsOfUse' ? value : pC.termsOfUse,
              __typename: 'PropertyCollection',
            },
            __typename: 'PropertyCollection',
          },
          __typename: 'Mutation',
        },
      })
    } catch (error) {
      return console.log('error:', error.message) //setError(error.message)
    }
    // if id was updated, need to update url
    if (field === 'id') {
      app.history.push(`/Eigenschaften-Sammlungen/${value}`)
    }
  }
}
