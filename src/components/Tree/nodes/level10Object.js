const level10Object = ({
  type,
  treeData,
  taxonomy,
  taxonomySort,
  level3Object,
  level4Object,
  level5Object,
  level6Object,
  level7Object,
  level8Object,
  level9Object,
}) => {
  const nodes = treeData?.level10Object?.objectsByParentId?.nodes ?? []

  return nodes.map((node) => {
    const childrenCount = node?.objectsByParentId?.totalCount ?? 0
    // give nodeName a value if it does not yet exist
    // otherwise empty nodes are sorted before its parent
    const nodeName = node.name || 'ZZZZ'

    return {
      id: node.id,
      url: [
        type,
        taxonomy.id,
        level3Object?.id,
        level4Object?.id,
        level5Object?.id,
        level6Object?.id,
        level7Object?.id,
        level8Object?.id,
        level9Object?.id,
        node.id,
      ],
      sort: [
        taxonomySort,
        taxonomy?.name,
        level3Object?.name,
        level4Object?.name,
        level5Object?.name,
        level6Object?.name,
        level7Object?.name,
        level8Object?.name,
        level9Object?.name,
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

export default level10Object
