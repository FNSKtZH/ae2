// @flow
export default (props: Object): Array<Object> => {
  if (!props) return []
  if (!props.allDataTypes) return []
  if (!props.allDataTypes.nodes) return []

  return props.allDataTypes.nodes.map(dataType => {
    const childrenCount =
      dataType.propertyCollectionsByDataType.totalCount ||
      dataType.relationCollectionsByDataType.totalCount ||
      dataType.categoriesByDataType.totalCount
    let labelCount = ''
    if (dataType.name !== 'taxonomy') {
      labelCount = ` (${childrenCount})`
    }

    return {
      id: dataType.name,
      url: [dataType.name],
      label: `${dataType.nameGerman}${labelCount}`,
      childrenCount,
    }
  })
}
