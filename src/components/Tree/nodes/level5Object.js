// @flow
import get from 'lodash/get'

export default ({
  treeData,
  activeLevel2TaxonomyName,
  activeLevel3ObjectName,
  activeLevel3ObjectId,
  activeLevel4ObjectName,
  activeLevel4ObjectId,
}: {
  treeData: Object,
  activeLevel2TaxonomyName: ?String,
  activeLevel3ObjectName: ?String,
  activeLevel3ObjectId: ?String,
  activeLevel4ObjectName: ?String,
  activeLevel4ObjectId: ?String,
}): Array<Object> => {
  if (!treeData) return []
  if (!treeData.level5Object) return []
  if (!treeData.level5Object.objectsByParentId) return []
  if (!treeData.level5Object.objectsByParentId.nodes) return []

  return treeData.level5Object.objectsByParentId.nodes.map(node => {
    const childrenCount =
      node.objectsByParentId && node.objectsByParentId.totalCount
        ? node.objectsByParentId.totalCount
        : 0
    const labelCount = childrenCount > 0 ? ` (${childrenCount})` : ''
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
      url: [
        elem1,
        activeLevel2TaxonomyName,
        activeLevel3ObjectId,
        activeLevel4ObjectId,
        node.id,
      ],
      sort: [
        sort1,
        activeLevel2TaxonomyName,
        activeLevel3ObjectName,
        activeLevel4ObjectName,
        nodeName,
      ],
      label: node.name,
      info: labelCount.toLocaleString('de-CH'),
      childrenCount,
      menuType: 'CmObject',
    }
  })
}
