const level3Object = ({ type, treeData, taxonomy }) => {
  const nodes = treeData?.taxonomyObjectLevel1?.nodes ?? []

  return nodes.map((node) => {
    const childrenCount = node?.objectsByParentId?.totalCount ?? 0
    // give nodeName a value if it does not yet exist
    // otherwiese empty nodes are sorted before its parent
    const nodeName = node.name || 'ZZZZ'
    const sort1 = type === 'Arten' ? 1 : 2

    return {
      id: node.id,
      url: [type, taxonomy?.id, node.id],
      sort: [sort1, taxonomy?.name, nodeName],
      label: node.name,
      info:
        childrenCount > 0 ? `(${childrenCount.toLocaleString('de-CH')})` : '',
      childrenCount,
      menuType: 'CmObject',
    }
  })
}

export default level3Object
