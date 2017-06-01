// @flow
export default (props: Object): Array<Object> => {
  console.log('TreeLevel0: props:', props)
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
