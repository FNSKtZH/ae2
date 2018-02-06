// @flow
import get from 'lodash/get'

export default ({
  treeData,
  activeLevel2TaxonomyName,
  activeLevel3ObjectName,
  activeLevel3ObjectId,
  activeLevel4ObjectName,
  activeLevel4ObjectId,
  activeLevel5ObjectName,
  activeLevel5ObjectId,
}: {
  treeData: Object,
  activeLevel2TaxonomyName: ?String,
  activeLevel3ObjectName: ?String,
  activeLevel3ObjectId: ?String,
  activeLevel4ObjectName: ?String,
  activeLevel4ObjectId: ?String,
  activeLevel5ObjectName: ?String,
  activeLevel5ObjectId: ?String,
}): Array<Object> => {
  if (!treeData) return []
  const nodes = get(treeData, 'level6Object.objectsByParentId.nodes', [])

  return nodes.map(node => {
    const childrenCount = get(node, 'objectsByParentId.totalCount', 0)
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
        taxonomy.id,
        activeLevel3ObjectId,
        activeLevel4ObjectId,
        activeLevel5ObjectId,
        node.id,
      ],
      sort: [
        sort1,
        activeLevel2TaxonomyName,
        activeLevel3ObjectName,
        activeLevel4ObjectName,
        activeLevel5ObjectName,
        nodeName,
      ],
      label: node.name,
      info:
        childrenCount > 0 ? ` (${childrenCount.toLocaleString('de-CH')})` : '',
      childrenCount,
      menuType: 'CmObject',
    }
  })
}
