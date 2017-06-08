// @flow
export default (store: Object, props: ?Object): Array<Object> => {
  if (!props) return []
  if (!props.allPropertyCollections) return []
  if (!props.allRelationCollections) return []
  if (!props.allCategories) return []
  store.tree.setActiveDataType(store.activeNodeArray[0])

  return [
    {
      id: 'Eigenschaften-Sammlungen',
      url: ['Eigenschaften-Sammlungen'],
      sort: ['Eigenschaften-Sammlungen'],
      label: `Eigenschaften-Sammlungen (${props.allPropertyCollections
        .totalCount})`,
      childrenCount: props.allPropertyCollections.totalCount,
    },
    {
      id: 'Beziehungs-Sammlungen',
      url: ['Beziehungs-Sammlungen'],
      sort: ['Beziehungs-Sammlungen'],
      label: `Beziehungs-Sammlungen (${props.allRelationCollections
        .totalCount})`,
      childrenCount: props.allRelationCollections.totalCount,
    },
    {
      id: 'Taxonomien',
      url: ['Taxonomien'],
      sort: ['Taxonomien'],
      label: `Taxonomien (${props.allCategories.totalCount} Gruppen)`,
      childrenCount: props.allCategories.totalCount,
    },
  ]
}
