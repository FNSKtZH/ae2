// @flow
import { graphql } from 'react-apollo'
import get from 'lodash/get'

import tcsGql from './tcsGql'

export default graphql(tcsGql, {
  options: ({ activeNodeArrayData }) => ({
    variables: {
      name: get(activeNodeArrayData, 'activeNodeArray', ['none', 'none'])[1],
    },
  }),
  name: 'tcsData',
})
