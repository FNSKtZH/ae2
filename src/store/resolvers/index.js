// @flow
import merge from 'lodash/merge'

import exportTaxProperties from './exportTaxProperties'
import exportTooManyProperties from './exportTooManyProperties'

export default history => merge(exportTaxProperties, exportTooManyProperties)
