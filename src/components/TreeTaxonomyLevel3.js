// @flow
import React from 'react'
import { QueryRenderer, graphql } from 'react-relay'

import environment from '../modules/createRelayEnvironment'
import Tree from './Tree'

const TreeTaxonomyLevel3 = () => (
  <QueryRenderer
    environment={environment}
    query={graphql`
      query TreeTaxonomyLevel3Query {
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
                  nodes {
                    id
                    name
                    isCategoryStandard
                    taxonomyObjectsByTaxonomyId(condition: {level: 1, taxonomyId: "5444e7eb-177f-4faf-ba44-0e3da1b391e0"}) {
                      totalCount
                      nodes {
                        id
                        name
                        taxonomyObjectsByParentId {
                          totalCount
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    `}
    render={({ error, props }) => {
      if (props) {
        console.log('TreeTaxonomyLevel3: props:', props)
      }
      return <Tree />
    }}
  />
)

export default TreeTaxonomyLevel3
