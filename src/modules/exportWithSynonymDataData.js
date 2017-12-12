// @flow
import { graphql } from 'react-apollo'

import exportWithSynonymDataGql from './exportWithSynonymDataGql'

export default graphql(exportWithSynonymDataGql, {
  name: 'exportWithSynonymDataData',
})
