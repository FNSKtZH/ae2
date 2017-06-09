// @flow
export default (store: Object, props: Object): Array<Object> =>
  props.level2Taxonomy.taxonomiesByCategory.nodes.map(node => {
    const childrenCount = node.taxonomyObjectLevel1.totalCount
    const activeLevel2Taxonomy = props.level1Taxonomy.nodes.find(
      n => n.id === store.activeNodeArray[1],
    )
    const activeLevel2TaxonomyName = activeLevel2Taxonomy
      ? activeLevel2Taxonomy.name
      : null

    return {
      id: node.id,
      url: ['Taxonomien', activeLevel2TaxonomyName, node.id],
      sort: [1, activeLevel2TaxonomyName, node.name],
      label: `${node.name} (${childrenCount})`,
      childrenCount,
    }
  })
