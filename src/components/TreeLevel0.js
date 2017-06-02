// @flow
import React from 'react'
import { QueryRenderer, graphql } from 'react-relay'

import environment from '../modules/createRelayEnvironment'
import Tree from './Tree'
import sort from '../modules/nodes/sort'
import level0FromProps from '../modules/nodes/level0FromProps'

const TreeLevel0 = () => (
  <QueryRenderer
    environment={environment}
    query={graphql`
      query TreeLevel0Query {
        allDataTypes {
          nodes {
            nameGerman
            name
            propertyCollectionsByDataType {
              totalCount
            }
            relationCollectionsByDataType {
              totalCount
            }
            categoriesByDataType {
              totalCount
            }
          }
        }
      }
    `}
    render={({ error, props }) => <Tree nodes={sort(level0FromProps(props))} />}
  />
)

export default TreeLevel0
