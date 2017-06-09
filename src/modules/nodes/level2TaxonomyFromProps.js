// @flow
export default (store: Object, props: Object): Array<Object> =>
  props.level1Taxonomy.nodes.map(node => {
    const childrenCount = node.taxonomyByCategory.totalCount

    return {
      id: node.id,
      url: ['Taxonomien', node.name],
      sort: [1, node.name],
      label: `${node.name} (${childrenCount})`,
      childrenCount,
    }
  })
