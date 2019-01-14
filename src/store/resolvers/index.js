// @flow
import merge from 'lodash/merge'

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

export default history =>
  merge(
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
    exportOnlyRowsWithProperties,
  )
