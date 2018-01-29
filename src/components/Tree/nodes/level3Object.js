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
  if (!treeData.level3Object) return []
  if (!treeData.level3Object) return []
  if (!treeData.level3Object.nodes) return []

  return treeData.level3Object.nodes.map(node => {
    const childrenCount =
      node.taxonomyObjectLevel1 && node.taxonomyObjectLevel1.totalCount
        ? node.taxonomyObjectLevel1.totalCount
        : 0
    // give nodeName a value if it does not yet exist
    // otherwiese empty nodes are sorted before its parent
    const nodeName = node.name || 'ZZZZ'
    const taxonomy = get(treeData, 'allTaxonomies.nodes').find(
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
