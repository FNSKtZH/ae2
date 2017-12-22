// @flow
import merge from 'lodash.merge'

import resolvers from './resolvers'
import activeNodeArray from './activeNodeArray'

export default merge(resolvers, activeNodeArray)
