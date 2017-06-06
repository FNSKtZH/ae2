// @flow
export default (store: Object, props: ?Object): Array<Object> => {
  if (!props) return []
  if (!props.allDataTypes) return []
  if (!props.allDataTypes.nodes) return []

  return props.allDataTypes.nodes.map(dataType => {
    let childrenCount = 0
    if (
      dataType.propertyCollectionsByDataType &&
      dataType.propertyCollectionsByDataType.totalCount
    ) {
      childrenCount =
        dataType.propertyCollectionsByDataType.totalCount ||
        dataType.relationCollectionsByDataType.totalCount ||
        dataType.categoryByDataType.totalCount
    }
    let labelCount = ` (${childrenCount})`
    if (dataType.name === 'taxonomy') {
      labelCount = ` nach Gruppen (${childrenCount} Gruppen)`
    }
    if (store.activeNodeArray[0] === dataType.name) {
      store.setActiveDataType(dataType)
    }

    return {
      id: dataType.name,
      url: [dataType.name],
      sort: [dataType.name],
      label: `${dataType.nameGerman}${labelCount}`,
      childrenCount,
    }
  })
}
