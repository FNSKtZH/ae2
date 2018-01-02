// @flow
import { graphql } from 'react-apollo'
import get from 'lodash/get'

import orgGql from './orgGql'

export default graphql(orgGql, {
  options: ({ activeNodeArrayData }) => ({
    variables: {
      orgName: get(activeNodeArrayData, 'activeNodeArray[1]'),
    },
  }),
  name: 'orgData',
})
