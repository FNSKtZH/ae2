// @flow
import { graphql } from 'react-apollo'

import exportRcoInOneRowGql from './exportRcoInOneRowGql'

export default graphql(exportRcoInOneRowGql, {
  name: 'exportRcoInOneRowData',
})
