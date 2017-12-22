// @flow
import merge from 'lodash.merge'

import resolvers from './resolvers'
import activeNodeArray from './activeNodeArray'
import treeFilter from './treeFilter'
import login from './login'
import exportCategories from './exportCategories'
import exportTaxonomies from './exportTaxonomies'
import exportTaxProperties from './exportTaxProperties'
import exportPcoProperties from './exportPcoProperties'

export default merge(
  resolvers,
  activeNodeArray,
  treeFilter,
  login,
  exportCategories,
  exportTaxonomies,
  exportTaxProperties,
  exportPcoProperties
)
