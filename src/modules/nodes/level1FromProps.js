// @flow
import get from 'lodash/get'

export default (data: Object): Array<Object> => {
  if (!data) return []
  const pcCount = get(data, 'allPropertyCollections.totalCount', 0)
  const taxCount = get(data, 'allCategories.totalCount', 0)

  return [
    {
      id: 'Eigenschaften-Sammlungen',
      url: ['Eigenschaften-Sammlungen'],
      sort: [2],
      label: `Eigenschaften-Sammlungen (${pcCount})`,
      childrenCount: pcCount,
    },
    {
      id: 'Taxonomien',
      url: ['Taxonomien'],
      sort: [1],
      label: `Taxonomien (${taxCount} Gruppen)`,
      childrenCount: taxCount,
    },
  ]
}
