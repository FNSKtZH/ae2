import get from 'lodash/get'

const level2Taxonomy = ({ type, level2Data }) => {
  if (!level2Data?.length) {
    console.log('no tree data for level2Taxonomy')
    return []
  }

  return level2Data.map((taxonomy) => {
    const level1Count = taxonomy?.topLevelObjects?.totalCount
    const allObjectsCount = get(taxonomy, 'objectsByTaxonomyId.totalCount', 0)
    const sort1 = type === 'Arten' ? 1 : 2

    return {
      id: taxonomy.id,
      url: [type, taxonomy.id],
      sort: [sort1, taxonomy.name],
      label: taxonomy.name,
      info: `(${level1Count})`,
      childrenCount: allObjectsCount,
      menuType: 'CmTaxonomy',
    }
  })
}

export default level2Taxonomy
