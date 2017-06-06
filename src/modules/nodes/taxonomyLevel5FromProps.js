// @flow
export default (store: Object, props: Object): Array<Object> => {
  if (!props) return []
  if (!props.allDataTypes) return []
  if (!props.allDataTypes.nodes) return []

  // find dataType
  const dataType = props.allDataTypes.nodes.find(n => n.name === 'taxonomy')
  if (!dataType) return []
  if (!dataType.categoriesByDataType) return []
  if (!dataType.categoriesByDataType.nodes) return []

  // find category
  const categoryName = store.activeNodeArray[1]
  if (!categoryName) return []
  const category = dataType.categoriesByDataType.nodes.find(
    n => n.name === categoryName
  )
  if (!category) return []
  if (!category.taxonomyByCategory) return []
  if (!category.taxonomyByCategory.nodes) return []

  // find taxonomy
  const taxonomyId = store.activeNodeArray[2]
  if (!taxonomyId) return []
  const taxonomy = category.taxonomyByCategory.nodes.find(
    n => n.id === taxonomyId
  )
  if (!taxonomy) return []
  if (!taxonomy.taxonomyObjectLevel1) return []
  if (!taxonomy.taxonomyObjectLevel1.nodes) return []

  // find level3
  const level3Id = store.activeNodeArray[3]
  if (!level3Id) return []
  const level3 = taxonomy.taxonomyObjectLevel1.nodes.find(
    n => n.id === level3Id
  )
  if (!level3) return []
  if (!level3.taxonomyObjectsByParentId) return []
  if (!level3.taxonomyObjectsByParentId.nodes) return []

  // find level4
  const level4Id = store.activeNodeArray[4]
  if (!level4Id) return []
  const level4 = level3.taxonomyObjectsByParentId.nodes.find(
    n => n.id === level4Id
  )
  if (!level4) return []
  if (!level4.taxonomyObjectsByParentId) return []
  if (!level4.taxonomyObjectsByParentId.nodes) return []

  return level4.taxonomyObjectsByParentId.nodes.map(level5 => {
    const childrenCount = level5.taxonomyObjectsByParentId.totalCount
    const labelCount = childrenCount > 0 ? ` (${childrenCount})` : ''

    return {
      id: level5.id,
      url: [
        store.activeDataType.name,
        store.activeCategory.name,
        taxonomy.id,
        level3.id,
        level4.id,
        level5.id,
      ],
      sort: [
        store.activeDataType.name,
        store.activeCategory.name,
        taxonomy.name,
        level3.name,
        level4.name,
        level5.name,
      ],
      label: `${level5.name}${labelCount}`,
      childrenCount,
    }
  })
}
