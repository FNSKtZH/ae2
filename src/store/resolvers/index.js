// @flow
import merge from 'lodash/merge'

import exportIds from './exportIds'
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
    exportIds,
    exportTaxProperties,
    exportPcoProperties,
    exportRcoProperties,
    exportTooManyProperties,
    exportWithSynonymData,
    exportAddFilterFields,
    exportRcoInOneRow,
    exportOnlyRowsWithProperties,
  )
