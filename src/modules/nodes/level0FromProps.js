// @flow
export default (store: Object, props: ?Object): Array<Object> => {
  if (!props) return []
  if (!props.allPropertyCollections) return []
  if (!props.allRelationCollections) return []
  if (!props.allCategories) return []
  store.setActiveDataType(store.activeNodeArray[0])

  return [
    {
      id: 'property_collection',
      url: ['property_collection'],
      sort: ['Eigenschaften-Sammlungen'],
      label: `Eigenschaften-Sammlungen (${props.allPropertyCollections
        .totalCount})`,
      childrenCount: props.allPropertyCollections.totalCount,
    },
    {
      id: 'relation_collection',
      url: ['relation_collection'],
      sort: ['Beziehungs-Sammlungen'],
      label: `Beziehungs-Sammlungen (${props.allRelationCollections
        .totalCount})`,
      childrenCount: props.allRelationCollections.totalCount,
    },
    {
      id: 'taxonomy',
      url: ['taxonomy'],
      sort: ['Taxonomien'],
      label: `Taxonomien (${props.allCategories.totalCount} Gruppen)`,
      childrenCount: props.allCategories.totalCount,
    },
  ]
}
