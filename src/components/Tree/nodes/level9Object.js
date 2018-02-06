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
  activeLevel6ObjectName,
  activeLevel6ObjectId,
  activeLevel7ObjectName,
  activeLevel7ObjectId,
  activeLevel8ObjectName,
  activeLevel8ObjectId,
}: {
  treeData: Object,
  activeLevel2TaxonomyName: ?String,
  activeLevel3ObjectName: ?String,
  activeLevel3ObjectId: ?String,
  activeLevel4ObjectName: ?String,
  activeLevel4ObjectId: ?String,
  activeLevel5ObjectName: ?String,
  activeLevel5ObjectId: ?String,
  activeLevel6ObjectName: ?String,
  activeLevel6ObjectId: ?String,
  activeLevel7ObjectName: ?String,
  activeLevel7ObjectId: ?String,
  activeLevel8ObjectName: ?String,
  activeLevel8ObjectId: ?String,
}): Array<Object> => {
  if (!treeData) return []
  const nodes = get(treeData, 'level9Object.objectsByParentId.nodes', [])
  const taxonomy = get(treeData, 'allTaxonomies.nodes').find(
    tax => tax.name === activeLevel2TaxonomyName
  )
  if (!taxonomy) return []
  const taxType = taxonomy.type
  if (!taxType) return []
  const elem1 = taxType === 'ART' ? 'Arten' : 'Lebensräume'
  const sort1 = taxType === 'ART' ? 1 : 2

  return nodes.map(node => {
    const childrenCount = get(node, 'objectsByParentId.totalCount', 0)
    // give nodeName a value if it does not yet exist
    // otherwiese empty nodes are sorted before its parent
    const nodeName = node.name || 'ZZZZ'

    return {
      id: node.id,
      url: [
        elem1,
        taxonomy.id,
        activeLevel3ObjectId,
        activeLevel4ObjectId,
        activeLevel5ObjectId,
        activeLevel6ObjectId,
        activeLevel7ObjectId,
        activeLevel8ObjectId,
        node.id,
      ],
      sort: [
        sort1,
        activeLevel2TaxonomyName,
        activeLevel3ObjectName,
        activeLevel4ObjectName,
        activeLevel5ObjectName,
        activeLevel6ObjectName,
        activeLevel7ObjectName,
        activeLevel8ObjectName,
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
