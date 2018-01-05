// @flow
import { graphql } from 'react-apollo'
import get from 'lodash/get'

import pcsGql from './pcsGql'

export default graphql(pcsGql, {
  options: ({ activeNodeArrayData }) => ({
    variables: {
      name: get(activeNodeArrayData, 'activeNodeArray', ['none', 'none'])[1],
    },
  }),
  name: 'pcsData',
})
