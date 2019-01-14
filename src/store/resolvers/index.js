// @flow
import merge from 'lodash/merge'

import exportTaxProperties from './exportTaxProperties'
import exportPcoProperties from './exportPcoProperties'
import exportRcoProperties from './exportRcoProperties'
import exportTooManyProperties from './exportTooManyProperties'
import exportWithSynonymData from './exportWithSynonymData'
import exportAddFilterFields from './exportAddFilterFields'
import exportRcoInOneRow from './exportRcoInOneRow'

export default history =>
  merge(
    exportTaxProperties,
    exportPcoProperties,
    exportRcoProperties,
    exportTooManyProperties,
    exportWithSynonymData,
    exportAddFilterFields,
    exportRcoInOneRow,
  )
