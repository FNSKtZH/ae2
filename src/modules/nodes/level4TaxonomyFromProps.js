// @flow
export default (store: Object, props: Object): Array<Object> => {
  if (!props) return []
  if (!props.level4Taxonomy) return []
  if (!props.level4Taxonomy.taxonomyObjectLevel1) return []
  if (!props.level4Taxonomy.taxonomyObjectLevel1.nodes) return []

  return props.level4Taxonomy.taxonomyObjectLevel1.nodes.map(node => {
    const childrenCount = node.taxonomyObjectsByParentId.totalCount
    const labelCount = childrenCount > 0 ? ` (${childrenCount})` : ''
    const activeLevel2Taxonomy = props.level1Taxonomy.nodes.find(
      n => n.id === store.activeNodeArray[1]
    )
    const activeLevel3Taxonomy = props.level2Taxonomy.nodes.find(
      n => n.id === store.activeNodeArray[2]
    )

    return {
      id: node.id,
      url: [
        'Taxonomien',
        activeLevel2Taxonomy.name,
        activeLevel3Taxonomy.id,
        node.id,
      ],
      sort: [
        1,
        activeLevel2Taxonomy.name,
        activeLevel3Taxonomy.name,
        node.name,
      ],
      label: `${node.name}${labelCount}`,
      childrenCount,
    }
  })
}
