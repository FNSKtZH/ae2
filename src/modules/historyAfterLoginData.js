// @flow
import { graphql } from 'react-apollo'

import historyAfterLoginGql from './historyAfterLoginGql'

export default graphql(historyAfterLoginGql, {
  name: 'historyAfterLoginData',
})
