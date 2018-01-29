// @flow
import get from 'lodash/get'

export default ({
  treeData,
  activeLevel2TaxonomyName,
}: {
  treeData: Object,
  activeLevel2TaxonomyName: Object,
}): Array<Object> => {
  if (!treeData) return []
  if (!treeData.level2Taxonomy) return []
  if (!treeData.level2Taxonomy.nodes) return []
  const taxonomy = get(treeData, 'level2Taxonomy.nodes').find(
    tax => tax.name === activeLevel2TaxonomyName
  )
  if (!taxonomy) return []
  const taxType = taxonomy.type
  if (!taxType) return []
  const elem1 = taxType === 'Art' ? 'Arten' : 'Lebensräume'
  const sort1 = taxType === 'Art' ? 1 : 2

  return treeData.level2Taxonomy.nodes.map(node => ({
    id: node.id,
    url: [elem1, node.name],
    sort: [sort1, node.name],
    label: node.name,
    info: `(${node.count.toLocaleString('de-CH')} ${
      node.count === '1' ? 'Taxonomie' : 'Taxonomien'
    })`,
    childrenCount: node.count,
    menuType: 'CmCategory',
  }))
}
