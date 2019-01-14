import { types } from 'mobx-state-tree'

import TaxProperty, { defaultValue as defaultTaxProperty } from './TaxProperty'
import PcoProperty, { defaultValue as defaultPcoProperty } from './PcoProperty'
import RcoProperty, { defaultValue as defaultRcoProperty } from './RcoProperty'
import TaxFilter, { defaultValue as defaultTaxFilter } from './TaxFilter'
import PcoFilter, { defaultValue as defaultPcoFilter } from './PcoFilter'
import RcoFilter, { defaultValue as defaultRcoFilter } from './RcoFilter'

export default types
  .model('Export', {
    type: types.optional(types.maybeNull(types.string), null),
    taxonomies: types.optional(types.array(types.string), []),
    ids: types.optional(types.array(types.string), []),
    taxProperties: types.optional(TaxProperty, defaultTaxProperty),
    pcoProperties: types.optional(PcoProperty, defaultPcoProperty),
    rcoProperties: types.optional(RcoProperty, defaultRcoProperty),
    taxFilters: types.optional(TaxFilter, defaultTaxFilter),
    pcoFilters: types.optional(PcoFilter, defaultPcoFilter),
    rcoFilters: types.optional(RcoFilter, defaultRcoFilter),
    onlyRowsWithProperties: types.optional(types.boolean, true),
    withSynonymData: types.optional(types.boolean, true),
    tooManyProperties: types.optional(types.boolean, false),
    addFilterFields: types.optional(types.boolean, true),
    rcoInOneRow: types.optional(types.boolean, true),
  })
  .actions(self => ({
    setType(value) {
      self.type = value
    },
    setTaxonomies(value) {
      self.taxonomies = value
    },
  }))

export const defaultValue = {}
