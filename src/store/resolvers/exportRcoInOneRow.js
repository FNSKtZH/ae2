// @flow
import uniq from 'lodash/uniq'
import exportRcoPropertiesGql from '../../components/Export/exportRcoPropertiesGql'

export default {
  Mutation: {
    setExportRcoInOneRow: (_, { value }, { cache }) => {
      const { exportRcoProperties } = cache.readQuery({
        query: exportRcoPropertiesGql,
      })
      const rcoPCTypes = uniq(
        exportRcoProperties.map(e => `${e.pcname}/${e.relationtype}`)
      )
      if (rcoPCTypes.length < 2) {
        cache.writeData({ data: { exportRcoInOneRow: value } })
      } else {
        cache.writeData({ data: { exportRcoInOneRow: true } })
      }
      return null
    },
  },
}
