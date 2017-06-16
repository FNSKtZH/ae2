// @flow
import { extendObservable, action, computed } from 'mobx'

export default (store: Object): void => {
  extendObservable(store.treeFilter, {
    text: '',
    setText: action('setText', (text: string) => {
      store.treeFilter.text = text
    }),
    id: null,
    setId: action('setId', (id: string) => {
      store.treeFilter.id = id
    }),
    // taxonomyObject, propertyCollection or relationCollection
    type: 'taxonomyObject',
    setType: action('setType', (type: string) => {
      store.treeFilter.type = type
    }),
    taxonomyObjectId: computed(
      () => {
        const { treeFilter } = store
        if (treeFilter.id && treeFilter.type === 'taxonomyObject') {
          return treeFilter.id
        }
        return null
      },
      { name: 'taxonomyObjectId' }
    ),
    propertyCollectionObjectId: computed(
      () => {
        const { treeFilter } = store
        if (treeFilter.id && treeFilter.type === 'propertyCollection') {
          return treeFilter.id
        }
        return null
      },
      { name: 'propertyCollectionObjectId' }
    ),
    relationCollectionObjectId: computed(
      () => {
        const { treeFilter } = store
        if (treeFilter.id && treeFilter.type === 'relationCollection') {
          return treeFilter.id
        }
        return null
      },
      { name: 'relationCollectionObjectId' }
    ),
  })
}
