// @flow
import merge from 'lodash/merge'

import exportTooManyProperties from './exportTooManyProperties'

export default history => merge(exportTooManyProperties)
