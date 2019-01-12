import { types } from 'mobx-state-tree'

import TaxProperty, { defaultValue as defaultTaxProperty } from './TaxProperty'
import PcoProperty, { defaultValue as defaultPcoProperty } from './PcoProperty'

export default types.model('Export', {
  type: types.optional(types.maybeNull(types.string), null),
  taxonomies: types.optional(types.array(types.string), []),
  ids: types.optional(types.array(types.string), []),
  taxProperties: types.optional(TaxProperty, defaultTaxProperty),
  pcoProperties: types.optional(PcoProperty, defaultPcoProperty),
})

export const defaultValue = {}
