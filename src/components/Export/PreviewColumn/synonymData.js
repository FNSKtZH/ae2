// @flow
import { graphql } from 'react-apollo'

import allSynonyms from './allSynonyms.graphql'

export default graphql(allSynonyms, {
  name: 'synonymData',
})
