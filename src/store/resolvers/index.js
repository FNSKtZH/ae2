// @flow
import merge from 'lodash.merge'

import activeNodeArray from './activeNodeArray'
import treeFilter from './treeFilter'
import login from './login'
import exportType from './exportType'
import exportIds from './exportIds'
import exportTaxonomies from './exportTaxonomies'
import exportTaxProperties from './exportTaxProperties'
import exportPcoProperties from './exportPcoProperties'
import exportRcoProperties from './exportRcoProperties'
import exportTooManyProperties from './exportTooManyProperties'
import exportWithSynonymData from './exportWithSynonymData'
import exportOnlyRowsWithProperties from './exportOnlyRowsWithProperties'
import editingTaxonomies from './editingTaxonomies'
import historyAfterLogin from './historyAfterLogin'

export default merge(
  activeNodeArray,
  treeFilter,
  login,
  exportType,
  exportIds,
  exportTaxonomies,
  exportTaxProperties,
  exportPcoProperties,
  exportRcoProperties,
  exportTooManyProperties,
  exportWithSynonymData,
  editingTaxonomies,
  exportOnlyRowsWithProperties,
  historyAfterLogin
)
