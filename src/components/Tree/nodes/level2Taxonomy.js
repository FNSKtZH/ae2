import get from 'lodash/get'

const level2Taxonomy = ({ type, taxonomySort, taxonomies }) =>
  taxonomies.map((taxonomy) => {
    const level1Count = taxonomy?.topLevelObjects?.totalCount
    const allObjectsCount = get(taxonomy, 'objectsByTaxonomyId.totalCount', 0)

    return {
      id: taxonomy.id,
      url: [type, taxonomy.id],
      sort: [taxonomySort, taxonomy.name],
      label: taxonomy.name,
      info: `(${level1Count})`,
      childrenCount: allObjectsCount,
      menuType: 'CmTaxonomy',
    }
  })

export default level2Taxonomy
