// @flow
import React from 'react'
import { QueryRenderer, graphql } from 'react-relay'
import { inject } from 'mobx-react'
import compose from 'recompose/compose'

import environment from '../modules/createRelayEnvironment'
import Tree from './Tree'

const enhance = compose(inject('store'))

const TreeTaxonomyLevel4 = ({ store }: { store: Object }) => (
  <QueryRenderer
    environment={environment}
    query={graphql`
      query TreeTaxonomyLevel4Query {
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
                        taxonomyObjectsByParentId(condition: {parentId: "5f8f6fac-fe63-49c5-a143-f2e6e2174602"}) {
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
        }
      }
    `}
    render={({ error, props }) => {
      if (props) {
        console.log('TreeTaxonomyLevel4: props:', props)
      }
      return <Tree />
    }}
  />
)

export default enhance(TreeTaxonomyLevel4)
