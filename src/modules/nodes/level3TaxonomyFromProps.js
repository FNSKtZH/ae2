// @flow
export default (store: Object, props: Object): Array<Object> => {
  if (!props) return []
  if (!props.level3Taxonomy) return []
  if (!props.level3Taxonomy.taxonomiesByCategory) return []
  if (!props.level3Taxonomy.taxonomiesByCategory.nodes) return []

  return props.level3Taxonomy.taxonomiesByCategory.nodes.map(node => {
    const childrenCount = node.taxonomyObjectLevel1.totalCount
    const activeLevel2Taxonomy = props.level1Taxonomy.nodes.find(
      n => n.id === store.activeNodeArray[1]
    )

    return {
      id: node.id,
      url: ['Taxonomien', activeLevel2Taxonomy.name, node.id],
      sort: [1, activeLevel2Taxonomy.name, node.name],
      label: `${node.name} (${childrenCount})`,
      childrenCount,
    }
  })
}
