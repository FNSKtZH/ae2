// @flow
import { extendObservable, autorun, reaction, toJS } from 'mobx'
import isEqual from 'lodash/isEqual'
import get from 'lodash/get'

import getActiveNodeArrayFromPathname from '../action/getActiveNodeArrayFromPathname'
import buildNodesFromAppQuery from '../../modules/buildNodesFromAppQuery'
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
    buildNodes: reaction(
      () => store.props,
      () => buildNodesFromAppQuery(store)
    ),
    buldObjekt: reaction(
      () => get(store.props, 'taxonomyObjectById.objectByObjectId'),
      (objekt: Object) => store.setActiveTaxonomyObject(objekt)
    ),
    setSuggestionsTO: reaction(
      () => get(store.props, 'filterSuggestionsTO.nodes'),
      (suggestionsTO: Array<Object>) =>
        store.treeFilter.setSuggestionsTO(suggestionsTO)
    ),
    setSuggestionsPC: reaction(
      () => get(store.props, 'filterSuggestionsPC.nodes'),
      (suggestionsPC: Array<Object>) =>
        store.treeFilter.setSuggestionsPC(suggestionsPC)
    ),
    setSuggestionsRC: reaction(
      () => get(store.props, 'filterSuggestionsRC.nodes'),
      (suggestionsRC: Array<Object>) =>
        store.treeFilter.setSuggestionsRC(suggestionsRC)
    ),
    /**
     * if existsUrlFromTOId:
     * set new url and reset store.urlFromTOId
     */
    setUrlFromTOId: reaction(
      () => !!store.urlFromTOId && store.props.urlFromTO,
      () => {
        store.setUrlFromTOId(null)
        store.setActiveNodeArray(getUrlFromTOId(store.props.urlFromTO))
      }
    ),
  })
}
