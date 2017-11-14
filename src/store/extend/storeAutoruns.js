// @flow
import { extendObservable, autorunAsync, reaction, toJS } from 'mobx'
import isEqual from 'lodash/isEqual'
import get from 'lodash/get'
import app from 'ampersand-app'

import getActiveNodeArrayFromPathname from '../action/getActiveNodeArrayFromPathname'
import getUrlFromTOId from '../../modules/getUrlFromTOId'

import activeNodeArrayMutation from '../../modules/activeNodeArrayMutation'
import activeObjectMutation from '../../modules/activeObjectMutation'
import getActiveNodeArray from '../../modules/getActiveNodeArray'

export default (store: Object): void => {
  extendObservable(store, {
    manipulateActiveNodeArray: autorunAsync('manipulateActiveNodeArray', () => {
      const activeNodeArray = getActiveNodeArray()
      console.log('autorun: activeNodeArray:', activeNodeArray)
      // forward root to taxonomy
      if (activeNodeArray.length === 0) {
        return app.client.mutate({
          mutation: activeNodeArrayMutation,
          variables: { value: ['Taxonomien'] },
        })
      }
      const activeNodeArrayFromUrl = getActiveNodeArrayFromPathname()
      if (!isEqual(activeNodeArrayFromUrl, activeNodeArray)) {
        store.history.push(`/${activeNodeArray.join('/')}`)
      }
      // set activeTreeLevel
      store.activeTreeLevel = activeNodeArray.length
    }),
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
