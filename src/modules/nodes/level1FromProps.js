// @flow
import get from 'lodash/get'

export default ({
  data,
  allCategoriesData,
}: {
  data: Object,
  allCategoriesData: Object,
}): Array<Object> => {
  console.log('level1fromProps: allCategoriesData:', allCategoriesData)
  if (!data) return []
  const pcCount = get(data, 'allPropertyCollections.totalCount', 0)
  const taxCount = get(allCategoriesData, 'allCategories.totalCount', 0)

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
