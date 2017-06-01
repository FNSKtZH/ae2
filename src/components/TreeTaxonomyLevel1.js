// @flow
import React from 'react'
import { QueryRenderer, graphql } from 'react-relay'

import environment from '../modules/createRelayEnvironment'
import Tree from './Tree'

const TreeTaxonomyLevel1 = () => (
  <QueryRenderer
    environment={environment}
    query={graphql`
      query TreeTaxonomyLevel1Query {
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
              nodes {
                id
                name
                taxonomiesByCategory {
                  totalCount
                }
              }
            }
          }
        }
      }
    `}
    render={({ error, props }) => {
      if (props) {
        console.log('TreeTaxonomyLevel1: props:', props)
      }
      return <Tree />
    }}
  />
)

export default TreeTaxonomyLevel1
