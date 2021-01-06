const level7Object = ({
  type,
  treeData,
  taxonomy,
  taxonomySort,
  level3Object,
  level4Object,
  activeLevel5ObjectName,
  activeLevel5ObjectId,
  activeLevel6ObjectName,
  activeLevel6ObjectId,
}) => {
  const nodes = treeData?.level7Object?.objectsByParentId?.nodes ?? []

  return nodes.map((node) => {
    const childrenCount = node?.objectsByParentId?.totalCount ?? 0
    // give nodeName a value if it does not yet exist
    // otherwiese empty nodes are sorted before its parent
    const nodeName = node.name || 'ZZZZ'

    return {
      id: node.id,
      url: [
        type,
        taxonomy?.id,
        level3Object?.id,
        level4Object?.id,
        activeLevel5ObjectId,
        activeLevel6ObjectId,
        node.id,
      ],
      sort: [
        taxonomySort,
        taxonomy?.name,
        level3Object?.name,
        level4Object?.name,
        activeLevel5ObjectName,
        activeLevel6ObjectName,
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

export default level7Object
