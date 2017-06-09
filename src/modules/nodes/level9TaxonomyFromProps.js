// @flow
export default (store: Object, props: Object): Array<Object> => {
  return props.level9Taxonomy.taxonomyObjectsByParentId.nodes.map(node => {
    const childrenCount = node.taxonomyObjectsByParentId.totalCount
    const labelCount = childrenCount > 0 ? ` (${childrenCount})` : ''
    const activeLevel2Taxonomy = props.level1Taxonomy.nodes.find(
      n => n.id === store.activeNodeArray[1],
    )
    const activeLevel3Taxonomy = props.level2Taxonomy.nodes.find(
      n => n.id === store.activeNodeArray[2],
    )
    const activeLevel4Taxonomy = props.level3Taxonomy.nodes.find(
      n => n.id === store.activeNodeArray[3],
    )
    const activeLevel5Taxonomy = props.level4Taxonomy.nodes.find(
      n => n.id === store.activeNodeArray[4],
    )
    const activeLevel6Taxonomy = props.level5Taxonomy.nodes.find(
      n => n.id === store.activeNodeArray[5],
    )
    const activeLevel7Taxonomy = props.level6Taxonomy.nodes.find(
      n => n.id === store.activeNodeArray[6],
    )
    const activeLevel8Taxonomy = props.level7Taxonomy.nodes.find(
      n => n.id === store.activeNodeArray[7],
    )

    return {
      id: node.id,
      url: [
        'Taxonomien',
        activeLevel2Taxonomy.name,
        activeLevel3Taxonomy.id,
        activeLevel4Taxonomy.id,
        activeLevel5Taxonomy.id,
        activeLevel6Taxonomy.id,
        activeLevel7Taxonomy.id,
        activeLevel8Taxonomy.id,
        node.id,
      ],
      sort: [
        1,
        activeLevel2Taxonomy.name,
        activeLevel3Taxonomy.name,
        activeLevel4Taxonomy.name,
        activeLevel5Taxonomy.name,
        activeLevel6Taxonomy.name,
        activeLevel7Taxonomy.name,
        activeLevel8Taxonomy.name,
        node.name,
      ],
      label: `${node.name}${labelCount}`,
      childrenCount,
    }
  })
}
