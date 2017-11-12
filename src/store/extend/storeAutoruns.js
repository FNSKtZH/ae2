// @flow
import { extendObservable, autorun, reaction, toJS } from 'mobx'
import isEqual from 'lodash/isEqual'
import get from 'lodash/get'
import gql from 'graphql-tag'
import app from 'ampersand-app'

import getActiveNodeArrayFromPathname from '../action/getActiveNodeArrayFromPathname'
import getUrlFromTOId from '../../modules/getUrlFromTOId'

export default (store: Object): void => {
  extendObservable(store, {
    manipulateActiveNodeArray: autorun('manipulateActiveNodeArray', () => {
      const activeNodeArray = toJS(store.activeNodeArray)
      // forward root to taxonomy
      if (activeNodeArray.length === 0) {
        return store.setActiveNodeArray(['Taxonomien'])
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
      // () => store.props,
      () => {
        const activeObject = get(store.props, 'activeObject', null)

        console.log('autorun, activeObject:', activeObject)

        // TODO: update local apollo store
        const query = gql`
          query activeObjectApollo {
            activeObjects @client {
              id
              taxonomyId
              parentId
              name
              properties
              category
              idOld
            }
          }
        `
        app.client.query({ query }).then(value => console.log('value:', value))

        const mutation = gql`
          mutation setActiveObject(
            $id: String
            $taxonomyId: String
            $parentId: String
            $name: String
            $properties: String
            $category: String
            $idOld: String
          ) {
            setActiveObject(
              id: $id
              taxonomyId: $taxonomyId
              parentId: $parentId
              name: $name
              properties: $properties
              category: $category
              idOld: $idOld
            )
          }
        `
        app.client.mutate({
          mutation,
          variables: { ...activeObject },
        })
        return store.setActiveObject(activeObject)
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
          store.setActiveNodeArray(getUrlFromTOId(urlFromTO))
          store.setUrlFromTOId(null)
        }
      }
    ),
    onChangeUrlFromPCData: reaction(
      () => store.urlFromPCId,
      urlFromPCId => {
        // do nothing when filterField was emptied
        if (urlFromPCId) {
          store.setActiveNodeArray(['Eigenschaften-Sammlungen', urlFromPCId])
          store.setUrlFromPCId(null)
        }
      }
    ),
  })
}
