// @flow
export default (store: Object, props: Object): Array<Object> => {
  console.log('taxonomyLevel1: props:', props)
  if (props) {
    return props.allDataTypes.nodes.map((n, index) => {
      const childrenCount =
        n.propertyCollectionsByDataType.totalCount ||
        n.relationCollectionsByDataType.totalCount ||
        n.categoriesByDataType.totalCount
      return {
        id: n.name,
        url: [n.name],
        label: n.nameGerman,
        childrenCount,
      }
    })
  }
  return []
}
