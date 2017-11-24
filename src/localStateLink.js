// @flow
import { withClientState } from 'apollo-link-state'
import app from 'ampersand-app'
import isEqual from 'lodash/isEqual'

import activeNodeArrayGql from './modules/activeNodeArrayGql'
import treeFilterGql from './modules/treeFilterGql'
import exportCategoriesGql from './modules/exportCategoriesGql'
import exportCombineTaxonomiesGql from './modules/exportCombineTaxonomiesGql'
import exportPcoPropertiesGql from './modules/exportPcoPropertiesGql'
import getActiveNodeArrayFromPathname from './modules/getActiveNodeArrayFromPathname'

export default withClientState({
  Query: {
    // provide initial state
    activeNodeArray: () => [],
    exportCategories: () => [],
    exportCombineTaxonomies: () => false,
    exportPcoProperties: () => [],
    // this is experimental
    // see: https://github.com/apollographql/apollo-link-state/issues/111
    treeFilter: () => ({
      text: '',
      id: null,
      __typename: 'TreeFilter',
    }),
  },
  Mutation: {
    // update values in the store on mutations
    setActiveNodeArray: (_, { value }, { cache }) => {
      cache.writeQuery({
        query: activeNodeArrayGql,
        data: { activeNodeArray: value },
      })
      const activeNodeArrayFromUrl = getActiveNodeArrayFromPathname()
      if (!isEqual(activeNodeArrayFromUrl, value)) {
        app.history.push(`/${value.join('/')}`)
      }
      return null
    },
    setTreeFilter: (_, { id, text }, { cache }) => {
      const treeFilter = { id, text, __typename: 'TreeFilter' }
      cache.writeQuery({
        query: treeFilterGql,
        data: { treeFilter },
      })
      return null
    },
    setExportCategories: (_, { value }, { cache }) => {
      cache.writeQuery({
        query: exportCategoriesGql,
        data: { exportCategories: value },
      })
      return null
    },
    setExportCombineTaxonomies: (_, { value }, { cache }) => {
      cache.writeQuery({
        query: exportCombineTaxonomiesGql,
        data: { exportCombineTaxonomies: value },
      })
      return null
    },
    addExportPcoProperty: (_, { pCName, pName }, { cache }) => {
      console.log('localStateLink, addExportPcoProperty: pCName:', pCName)
      console.log('localStateLink, addExportPcoProperty: pName:', pName)
      const current = cache.readQuery({ query: exportPcoPropertiesGql })
      console.log('localStateLink, addExportPcoProperty: current:', current)
      const data = current.exportPcoProperties.concat([
        { pCName, pName, __typename: 'ExportPcoProperties' },
      ])
      console.log('localStateLink, addExportPcoProperty: data:', data)
      cache.writeQuery({
        query: exportPcoPropertiesGql,
        data,
      })
      return null
    },
    removeExportPcoProperty: (_, { pCName, pName }, { cache }) => {
      const current = cache.readQuery({ exportPcoPropertiesGql })
      const data = current.exportPcoProperties.filter(
        x => !(x.pCName === pCName && x.pName === pName)
      )
      cache.writeQuery({
        query: exportPcoPropertiesGql,
        data,
      })
      return null
    },
  },
})
