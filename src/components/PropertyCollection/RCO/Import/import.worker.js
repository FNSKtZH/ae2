import omit from 'lodash/omit'

import upsertRCOMutation from './upsertRCOMutation'

const importPco = async ({ importData = [], pCO, pCId, client }) => {
  console.log('importWorker',{ importData = [], pCO, pCId, client })
  // need a list of all fields
  // loop all rows, build variables and create pco
  // eslint-disable-next-line no-unused-vars
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
  return
}

export importPco
