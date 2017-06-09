// @flow
export default (store: Object, props: ?Object): Array<Object> => {
  if (!props) return []
  if (!props.allPropertyCollections) return []
  if (!props.allRelationCollections) return []
  if (!props.allCategories) return []
  // store.tree.setActiveLevel1(store.activeNodeArray[0])

  return [
    {
      id: 'Eigenschaften-Sammlungen',
      url: ['Eigenschaften-Sammlungen'],
      sort: [2],
      label: `Eigenschaften-Sammlungen (${props.allPropertyCollections
        .totalCount})`,
      childrenCount: props.allPropertyCollections.totalCount,
    },
    {
      id: 'Beziehungs-Sammlungen',
      url: ['Beziehungs-Sammlungen'],
      sort: [3],
      label: `Beziehungs-Sammlungen (${props.allRelationCollections
        .totalCount})`,
      childrenCount: props.allRelationCollections.totalCount,
    },
    {
      id: 'Taxonomien',
      url: ['Taxonomien'],
      sort: [1],
      label: `Taxonomien (${props.allCategories.totalCount} Gruppen)`,
      childrenCount: props.allCategories.totalCount,
    },
  ]
}
