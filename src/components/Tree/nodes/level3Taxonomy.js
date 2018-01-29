// @flow
import get from 'lodash/get'

export default ({
  treeData,
  activeLevel2TaxonomyName,
}: {
  treeData: Object,
  activeLevel2TaxonomyName: ?String,
}): Array<Object> => {
  if (!treeData) return []
  if (!treeData.level3Taxonomy) return []
  if (!treeData.level3Taxonomy) return []
  if (!treeData.level3Taxonomy.nodes) return []

  return treeData.level3Taxonomy.nodes.map(node => {
    const childrenCount =
      node.objectLevel1 && node.objectLevel1.totalCount
        ? node.objectLevel1.totalCount
        : 0
    // give nodeName a value if it does not yet exist
    // otherwiese empty nodes are sorted before its parent
    const nodeName = node.name || 'ZZZZ'
    const taxonomy = get(treeData, 'level2Taxonomy.nodes').find(
      tax => tax.name === activeLevel2TaxonomyName
    )
    if (!taxonomy) return []
    const taxType = taxonomy.type
    if (!taxType) return []
    const elem1 = taxType === 'ART' ? 'Arten' : 'Lebensräume'
    const sort1 = taxType === 'ART' ? 1 : 2

    return {
      id: node.id,
      url: [elem1, activeLevel2TaxonomyName, node.id],
      sort: [sort1, activeLevel2TaxonomyName, nodeName],
      label: node.name,
      info: `(${childrenCount.toLocaleString('de-CH')})`,
      childrenCount,
      menuType: 'CmTaxonomy',
    }
  })
}
