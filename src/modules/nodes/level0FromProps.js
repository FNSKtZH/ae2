// @flow
export default (store: Object, props: ?Object): Array<Object> => {
  if (!props) return []
  if (!props.allDataTypes) return []
  if (!props.allDataTypes.nodes) return []

  return props.allDataTypes.nodes.map(dataType => {
    const childrenCount =
      dataType.propertyCollectionsByDataType.totalCount ||
      dataType.relationCollectionsByDataType.totalCount ||
      dataType.categoriesByDataType.totalCount
    let labelCount = ` (${childrenCount})`
    if (dataType.name === 'taxonomy') {
      labelCount = ` nach Gruppen (${childrenCount} Gruppen)`
    }
    console.log(
      'level0FromProps: store.activeNodeArray[0]:',
      store.activeNodeArray[0]
    )
    if (store.activeNodeArray[0] === dataType.name) {
      console.log('level0FromProps: dataType.name:', dataType.name)
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
