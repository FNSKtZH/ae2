// @flow
import { extendObservable, reaction } from 'mobx'
import get from 'lodash/get'
import app from 'ampersand-app'

import getUrlFromTOId from '../../modules/getUrlFromTOId'

import activeNodeArrayMutation from '../../modules/activeNodeArrayMutation'

export default (store: Object): void => {
  extendObservable(store, {
    onChangePcoPropertiesByCategories: reaction(
      () => get(store.props, 'pcoPropertiesByCategoriesFunction.nodes', []),
      (pcoProperties: Array<Object>) =>
        store.export.setPcoProperties(pcoProperties)
    ),
    onChangeUrlFromTOData: reaction(
      () => store.props.urlFromTO,
      urlFromTO => {
        // do nothing when filterField was emptied
        if (urlFromTO) {
          app.client.mutate({
            mutation: activeNodeArrayMutation,
            variables: { value: getUrlFromTOId(urlFromTO) },
          })
          store.setUrlFromTOId(null)
        }
      }
    ),
    onChangeUrlFromPCData: reaction(
      () => store.urlFromPCId,
      urlFromPCId => {
        // do nothing when filterField was emptied
        if (urlFromPCId) {
          app.client.mutate({
            mutation: activeNodeArrayMutation,
            variables: { value: ['Eigenschaften-Sammlungen', urlFromPCId] },
          })
          store.setUrlFromPCId(null)
        }
      }
    ),
  })
}
