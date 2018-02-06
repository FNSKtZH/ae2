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
  const taxonomiesWithLevel1Counts = get(
    treeData,
    'taxonomyWithLevel1Count.nodes',
    []
  )

  return nodes.map(node => {
    const taxonomy = get(treeData, 'allTaxonomies.nodes', []).find(
      n => n.id === node.id
    )
    const level1 = taxonomiesWithLevel1Counts.find(
      c => c.taxonomyId === node.id
    )
    const level1Count = level1 && level1.count ? level1.count : 0
    const allObjectsCount = get(taxonomy, 'objectsByTaxonomyId.totalCount', 0)
    const taxType = node.type
    const elem1 = taxType === 'ART' ? 'Arten' : 'Lebensräume'
    const sort1 = taxType === 'ART' ? 1 : 2
    /**
     * This number is not very helpful:
     * it includes all hierarchical levels
     * so show nothing
     */
    /*
    const info =
      allObjectsCount > 0
        ? `(${childrenCount.toLocaleString('de-CH')} ${elem1})`
        : ''
    */

    return {
      id: node.id,
      url: [elem1, node.id],
      sort: [sort1, node.name],
      label: node.name,
      info: `(${level1Count})`,
      childrenCount: allObjectsCount,
      menuType: 'CmTaxonomy',
    }
  })
}
