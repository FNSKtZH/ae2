// @flow
import get from 'lodash/get'

export default ({
  treeData,
  activeNodeArray,
}: {
  treeData: Object,
  activeNodeArray: Object,
}): Array<Object> => {
  if (!treeData) {
    console.log('no tree data for level2Taxonomy')
    return []
  }
  const nodes = get(treeData, 'allTaxonomies.nodes', []).filter(node => {
    if (activeNodeArray[0] === 'Arten') {
      return node.type === 'ART'
    }
    return node.type === 'LEBENSRAUM'
  })
  const childrenCount = get(treeData, 'taxonomyObjectLevel1.totalCount', 0)

  return nodes.map(node => {
    const taxType = node.type
    const elem1 = taxType === 'ART' ? 'Arten' : 'Lebensräume'
    const sort1 = taxType === 'ART' ? 1 : 2

    return {
      id: node.id,
      url: [elem1, node.id],
      sort: [sort1, node.name],
      label: node.name,
      info: `(${childrenCount.toLocaleString('de-CH')})`,
      childrenCount,
      menuType: 'CmTaxonomy',
    }
  })
}
