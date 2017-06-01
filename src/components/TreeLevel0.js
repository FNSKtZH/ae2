// @flow
import React from 'react'
import { QueryRenderer, graphql } from 'react-relay'

import environment from '../modules/createRelayEnvironment'
import Tree from './Tree'

const TreeLevel0 = () => (
  <QueryRenderer
    environment={environment}
    query={graphql`
      query TreeLevel0Query {
        allDataTypes {
          nodes {
            nameGerman
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
    render={({ error, props }) => {
      if (props) {
        console.log('TreeLevel0: props:', props)
      }
      return <Tree />
    }}
  />
)

export default TreeLevel0
