const level5Object = ({
  type,
  treeData,
  taxonomy,
  taxonomySort,
  level3Object,
  level4Object,
  level5Objects,
}) =>
  level5Objects.map((node) => {
    const childrenCount = node?.objectsByParentId?.totalCount ?? 0
    // give nodeName a value if it does not yet exist
    // otherwise empty nodes are sorted before its parent
    const nodeName = node.name || 'ZZZZ'

    return {
      id: node.id,
      url: [type, taxonomy.id, level3Object?.id, level4Object?.id, node.id],
      sort: [
        taxonomySort,
        taxonomy?.name,
        level3Object?.name,
        level4Object?.name,
        nodeName,
      ],
      label: node.name,
      info:
        childrenCount > 0 ? ` (${childrenCount.toLocaleString('de-CH')})` : '',
      childrenCount,
      menuType: 'CmObject',
    }
  })

export default level5Object
