// @flow
import { graphql } from 'react-apollo'

import loginGql from './loginGql'

export default graphql(loginGql, {
  name: 'loginData',
})
