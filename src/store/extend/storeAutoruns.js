// @flow
import { extendObservable, reaction, toJS } from 'mobx'
import isEqual from 'lodash/isEqual'
import get from 'lodash/get'
import app from 'ampersand-app'

import getUrlFromTOId from '../../modules/getUrlFromTOId'

import activeNodeArrayMutation from '../../modules/activeNodeArrayMutation'
import activeObjectMutation from '../../modules/activeObjectMutation'

export default (store: Object): void => {
  extendObservable(store, {
    onChangeObject: reaction(
      () => get(store.props, 'activeObject', null),

      () => {
        const activeObject = get(store.props, 'activeObject', null)

        // update local apollo store
        return app.client.mutate({
          mutation: activeObjectMutation,
          variables: { value: activeObject ? activeObject.id : null },
        })
      }
    ),
    onChangeCategories: reaction(
      () => get(store.props, 'allCategories.nodes', []),
      (categoryNodes: Array<Object>) => {
        const categoryNames = categoryNodes.map(c => c.name)
        const storeCategories = toJS(store.categories)
        if (!isEqual(storeCategories, categoryNames)) {
          store.setCategories(categoryNames)
        }
      }
    ),
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
