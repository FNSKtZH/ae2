// @flow
import get from 'lodash'

export default (store: Object, props: ?Object): Array<Object> => {
  if (!props) return []
  console.log('level1FromProps: props:', props)
  const pcCount = get(props, 'allPropertyCollections.totalCount')
  console.log('level1FromProps: pcCount:', pcCount)

  return [
    {
      id: 'Eigenschaften-Sammlungen',
      url: ['Eigenschaften-Sammlungen'],
      sort: [2],
      label: `Eigenschaften-Sammlungen (${get(
        props,
        'allPropertyCollections.totalCount'
      ) || 0})`,
      childrenCount: get(props, 'allPropertyCollections.totalCount') || 0,
    },
    {
      id: 'Beziehungs-Sammlungen',
      url: ['Beziehungs-Sammlungen'],
      sort: [3],
      label: `Beziehungs-Sammlungen (${get(
        props,
        'allRelationCollections.totalCount'
      ) || 0})`,
      childrenCount: get(props, 'allRelationCollections.totalCount') || 0,
    },
    {
      id: 'Taxonomien',
      url: ['Taxonomien'],
      sort: [1],
      label: `Taxonomien (${get(props, 'allCategories.totalCount') ||
        0} Gruppen)`,
      childrenCount: get(props, 'allCategories.totalCount') || 0,
    },
  ]
}
