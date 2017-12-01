// @flow
import get from 'lodash/get'

export default ({
  treeData,
  allCategoriesData,
}: {
  treeData: Object,
  allCategoriesData: Object,
}): Array<Object> => {
  if (!treeData) return []
  const pcCount = get(treeData, 'allPropertyCollections.totalCount', 0)
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
