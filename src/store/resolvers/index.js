// @flow
import merge from 'lodash/merge'

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
import exportAddFilterFields from './exportAddFilterFields'
import exportRcoInOneRow from './exportRcoInOneRow'
import exportOnlyRowsWithProperties from './exportOnlyRowsWithProperties'
import editingTaxonomies from './editingTaxonomies'
import editingPCs from './editingPCs'
import historyAfterLogin from './historyAfterLogin'
import updateAvailable from './updateAvailable'

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
  exportAddFilterFields,
  exportRcoInOneRow,
  editingTaxonomies,
  editingPCs,
  exportOnlyRowsWithProperties,
  historyAfterLogin,
  updateAvailable
)
