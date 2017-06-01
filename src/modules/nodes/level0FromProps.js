// @flow
export default (props: Object): Array<Object> => {
  if (!props) return []
  if (!props.allDataTypes) return []
  if (!props.allDataTypes.nodes) return []

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
