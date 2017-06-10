// @flow
import get from 'lodash/get'

export default ({
  store,
  props,
}: {
  store: Object,
  props: Object,
}): Array<Object> => {
  if (!props) return []
  if (!props.propertyCollectionByDataType) return []
  if (!props.propertyCollectionByDataType.nodes) return []

  return props.propertyCollectionByDataType.nodes.map(node => {
    const count = get(
      node,
      'propertyCollectionObjectsByPropertyCollectionId.totalCount',
      0
    )
    return {
      id: node.id,
      url: ['Eigenschaften-Sammlungen', node.id],
      sort: [2, node.name],
      label: `${node.name}: ${count} Objekte`,
      childrenCount: 0,
    }
  })
}
