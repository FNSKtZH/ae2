// @flow
import merge from 'lodash/merge'

import exportTaxProperties from './exportTaxProperties'
import exportRcoProperties from './exportRcoProperties'
import exportTooManyProperties from './exportTooManyProperties'

export default history =>
  merge(exportTaxProperties, exportRcoProperties, exportTooManyProperties)
