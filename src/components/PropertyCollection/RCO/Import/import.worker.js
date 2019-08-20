/* eslint no-restricted-globals:0 */

/**
 * this is how web worker would be implemented
 * but cra does not enable it yet, see:
 * https://github.com/facebook/create-react-app/pull/5886
 */

import omit from 'lodash/omit'

import upsertRCOMutation from './upsertRCOMutation'

self.addEventListener('message', async event => {
  const { importData = [], pCO, pCId, client } = event.data

  // need a list of all fields
  // loop all rows, build variables and create pco
  for (const [i, d] of importData.entries()) {
    const pco = pCO.find(o => o.objectId === d.objectId)
    const id = pco && pco.id ? pco.id : undefined
    const variables = {
      id,
      objectId: d.objectId || null,
      objectIdRelation: d.objectIdRelation || null,
      propertyCollectionId: pCId,
      propertyCollectionOfOrigin: d.propertyCollectionOfOrigin || null,
      relationType: d.relationType || null,
      properties: JSON.stringify(
        omit(d, [
          'id',
          'objectId',
          'objectIdRelation',
          'propertyCollectionId',
          'propertyCollectionOfOrigin',
          'relationType',
        ]),
      ),
    }
    try {
      await client.mutate({
        mutation: upsertRCOMutation,
        variables,
      })
    } catch (error) {
      console.log(error)
    }
    this.postMessage(i)
  }
})
