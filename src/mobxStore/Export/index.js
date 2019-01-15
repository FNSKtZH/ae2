import { types } from 'mobx-state-tree'
import uniq from 'lodash/uniq'

import TaxProperty, { defaultValue as defaultTaxProperty } from './TaxProperty'
import PcoProperty, { defaultValue as defaultPcoProperty } from './PcoProperty'
import RcoProperty, { defaultValue as defaultRcoProperty } from './RcoProperty'
import TaxFilter, { defaultValue as defaultTaxFilter } from './TaxFilter'
import PcoFilter, { defaultValue as defaultPcoFilter } from './PcoFilter'
import RcoFilter, { defaultValue as defaultRcoFilter } from './RcoFilter'
import constants from '../../modules/constants'

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
      const rcoPCTypes = uniq(
        self.rcoProperties.map(e => `${e.pcname}/${e.relationtype}`),
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
    addPcoProperty({ pcname, pname }) {
      const nrOfPropertiesExported =
        self.taxProperties.length +
        self.rcoProperties.length +
        self.pcoProperties.length
      if (nrOfPropertiesExported > constants.export.maxFields) {
        self.tooManyProperties = true
      } else {
        // only add if not yet done
        if (
          !self.pcoProperties.find(
            t => t.pcname === pcname && t.pname === pname,
          )
        ) {
          self.pcoProperties = [
            ...self.pcoProperties,
            {
              pcname,
              pname,
            },
          ]
        }
      }
    },
    removePcoProperty({ pcname, pname }) {
      self.pcoProperties = self.pcoProperties.filter(
        x => !(x.pcname === pcname && x.pname === pname),
      )
    },
    resetRcoFilters() {
      self.rcoFilters = []
    },
    setRcoFilters({ pcname, relationtype, pname, comparator, value }) {
      const rcoFilter = self.rcoFilters.find(
        x =>
          x.pcname === pcname &&
          x.relationtype === relationtype &&
          x.pname === pname,
      )
      if (!comparator && !value && value !== 0) {
        // remove
        self.rcoFilters = self.rcoFilters.filter(
          x =>
            !(
              x.pcname === pcname &&
              x.relationtype === relationtype &&
              x.pname === pname
            ),
        )
      } else if (!rcoFilter) {
        // add new one
        self.rcoFilters = [
          ...self.rcoFilters,
          {
            pcname,
            relationtype,
            pname,
            comparator,
            value,
          },
        ]
      } else {
        // edit = add new one instead of existing
        self.rcoFilters = [
          ...self.rcoFilters.filter(
            x =>
              !(
                x.pcname === pcname &&
                x.relationtype === relationtype &&
                x.pname === pname
              ),
          ),
          {
            pcname,
            relationtype,
            pname,
            comparator,
            value,
          },
        ]
      }
    },
    resetRcoProperties() {
      self.rcoProperties = []
    },
    resetPcoProperties() {
      self.pcoProperties = []
    },
    removeRcoProperty({ pcname, relationtype, pname }) {
      self.rcoProperties = self.rcoProperties.filter(
        x =>
          !(
            x.pcname === pcname &&
            x.relationtype === relationtype &&
            x.pname === pname
          ),
      )
    },
    addRcoProperty({ pcname, relationtype, pname }) {
      const nrOfPropertiesExported =
        self.taxProperties.length +
        self.rcoProperties.length +
        self.pcoProperties.length
      if (nrOfPropertiesExported > constants.export.maxFields) {
        self.tooManyProperties = true
      } else {
        // only add if not yet done
        const rcoProperty = self.rcoProperties.find(
          t =>
            t.pcname === pcname &&
            t.relationtype === relationtype &&
            t.pname === pname,
        )
        if (!rcoProperty) {
          const rcoProperties = [
            ...self.rcoProperties,
            {
              pcname,
              relationtype,
              pname,
            },
          ]
          self.rcoProperties = rcoProperties
          // set self.rcoInOneRow if more than one type of rco is choosen
          const rcoPCTypes = uniq(
            rcoProperties.map(e => `${e.pcname}/${e.relationtype}`),
          )
          if (rcoPCTypes.length > 1 && !self.rcoInOneRow) {
            self.rcoInOneRow = true
          }
        }
      }
    },
    addTaxProperty({ taxname, pname }) {
      const nrOfPropertiesExported =
        self.taxProperties.length +
        self.rcoProperties.length +
        self.pcoProperties.length
      if (nrOfPropertiesExported > constants.export.maxFields) {
        self.tooManyProperties = true
      } else {
        // only add if not yet done
        const taxProperty = self.taxProperties.find(
          t => t.taxname === taxname && t.pname === pname,
        )
        if (!taxProperty) {
          self.taxProperties = [...self.taxProperties, { taxname, pname }]
        }
      }
    },
    removeTaxProperty({ taxname, pname }) {
      self.taxProperties = self.taxProperties.filter(
        x => !(x.taxname === taxname && x.pname === pname),
      )
    },
    resetTaxProperties() {
      self.taxProperties = []
    },
  }))

export const defaultValue = {}
