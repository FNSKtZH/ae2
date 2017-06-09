// @flow
import get from 'lodash'
import { toJS } from 'mobx'

export default (store: Object, props: Object): Array<Object> => {
  if (!props) return []
  if (!props.allPropertyCollections) return []
  if (!props.allPropertyCollections.nodes) return []

  return props.allPropertyCollections.nodes.map(node => {
    return {
      id: node.id,
      url: ['Eigenschaften-Sammlungen', node.id],
      sort: [2, node.name],
      label: `${node.name}: ${get(
        toJS(node),
        'propertyCollectionObjectsByPropertyCollectionId.totalCount'
      ) || 0} Objekte`,
      childrenCount: 0,
    }
  })
}
