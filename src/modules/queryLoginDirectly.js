// @flow

import loginGql from './loginGql'

export default (client: Object) =>
  client.query({
    query: loginGql,
  })
