import { types } from 'mobx-state-tree'
import uniq from 'lodash/uniq'

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
    taxProperties: types.optional(
      types.array(types.optional(TaxProperty, defaultTaxProperty)),
      [],
    ),
    pcoProperties: types.optional(
      types.array(types.optional(PcoProperty, defaultPcoProperty)),
      [],
    ),
    rcoProperties: types.optional(
      types.array(types.optional(RcoProperty, defaultRcoProperty)),
      [],
    ),
    taxFilters: types.optional(
      types.array(types.optional(TaxFilter, defaultTaxFilter)),
      [],
    ),
    pcoFilters: types.optional(
      types.array(types.optional(PcoFilter, defaultPcoFilter)),
      [],
    ),
    rcoFilters: types.optional(
      types.array(types.optional(RcoFilter, defaultRcoFilter)),
      [],
    ),
    onlyRowsWithProperties: types.optional(types.boolean, true),
    withSynonymData: types.optional(types.boolean, true),
    tooManyProperties: types.optional(types.boolean, false), // TODO
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
    setIds(value) {
      self.ids = value
    },
    setOnlyRowsWithProperties(value) {
      self.onlyRowsWithProperties = value
    },
    setWithSynonymData(value) {
      self.withSynonymData = value
    },
    setTooManyProperties(value) {
      self.tooManyProperties = value
    },
    setAddFilterFields(value) {
      self.addFilterFields = value
    },
    setRcoInOneRow(value) {
      const exportRcoProperties = self.rcoProperties
      const rcoPCTypes = uniq(
        exportRcoProperties.map(e => `${e.pcname}/${e.relationtype}`),
      )
      if (rcoPCTypes.length < 2) {
        self.rcoInOneRow = value
      } else {
        self.rcoInOneRow = true
      }
    },
    resetPcoFilters() {
      self.pcoFilters = []
    },
    setPcoFilter({ pcname, pname, comparator, value }) {
      const pcoFilter = self.pcoFilters.find(
        x => x.pcname === pcname && x.pname === pname,
      )
      if (!comparator && !value && value !== 0) {
        // remove
        self.pcoFilters = self.pcoFilters.filter(
          x => !(x.pcname === pcname && x.pname === pname),
        )
      } else if (!pcoFilter) {
        // add new one
        self.pcoFilters = [
          ...self.pcoFilters,
          {
            pcname,
            pname,
            comparator,
            value,
          },
        ]
      } else {
        // edit = add new one instead of existing
        self.pcoFilters = [
          ...self.pcoFilters.filter(
            x => !(x.pcname === pcname && x.pname === pname),
          ),
          {
            pcname,
            pname,
            comparator,
            value,
          },
        ]
      }
    },
  }))

export const defaultValue = {}
