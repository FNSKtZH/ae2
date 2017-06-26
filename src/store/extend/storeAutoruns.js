// @flow
import { extendObservable, autorun, reaction, toJS } from 'mobx'
import isEqual from 'lodash/isEqual'
import get from 'lodash/get'

import getActiveNodeArrayFromPathname from '../action/getActiveNodeArrayFromPathname'
import buildNodesFromAppQuery from '../../modules/buildNodesFromAppQuery'

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
      () => get(store.props, 'taxonomyObjectById.objectByObjectId', null),
      () =>
        store.setActiveTaxonomyObject(
          get(store.props, 'taxonomyObjectById.objectByObjectId', null)
        )
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
  })
}
