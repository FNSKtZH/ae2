const level5Object = ({
  type,
  treeData,
  taxonomy,
  taxonomySort,
  level3Object,
  activeLevel4ObjectName,
  activeLevel4ObjectId,
}) => {
  const nodes = treeData?.level5Object?.objectsByParentId?.nodes ?? []

  return nodes.map((node) => {
    const childrenCount = node?.objectsByParentId?.totalCount ?? 0
    // give nodeName a value if it does not yet exist
    // otherwiese empty nodes are sorted before its parent
    const nodeName = node.name || 'ZZZZ'

    return {
      id: node.id,
      url: [type, taxonomy.id, level3Object?.id, activeLevel4ObjectId, node.id],
      sort: [
        taxonomySort,
        taxonomy?.name,
        level3Object?.name,
        activeLevel4ObjectName,
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

export default level5Object
