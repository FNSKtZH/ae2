// @flow
import React from 'react'
import { QueryRenderer, graphql } from 'react-relay'
import { observer, inject } from 'mobx-react'
import compose from 'recompose/compose'

import environment from '../modules/createRelayEnvironment'
import Tree from './Tree'
import sort from '../modules/nodes/sort'
import level0FromProps from '../modules/nodes/level0FromProps'
import taxonomyLevel1FromProps from '../modules/nodes/taxonomyLevel1FromProps'
import taxonomyLevel2FromProps from '../modules/nodes/taxonomyLevel2FromProps'
import taxonomyLevel3FromProps from '../modules/nodes/taxonomyLevel3FromProps'
import taxonomyLevel4FromProps from '../modules/nodes/taxonomyLevel4FromProps'
import taxonomyLevel5FromProps from '../modules/nodes/taxonomyLevel5FromProps'

const enhance = compose(inject('store'), observer)

const TreeTaxonomyLevel5 = ({ store }: { store: Object }) =>
  <QueryRenderer
    environment={environment}
    query={graphql`
      query TreeTaxonomyLevel5Query($level1: Uuid) {
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
                taxonomyByCategory {
                  totalCount
                  nodes {
                    id
                    name
                    isCategoryStandard
                    taxonomyObjectLevel1(taxonomyId: $level1) {
                      totalCount
                      nodes {
                        id
                        name
                        taxonomyObjectsByParentId {
                          totalCount
                          nodes {
                            id
                            name
                            taxonomyObjectsByParentId {
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
        }
      }
    `}
    variables={{ level1: store.activeNodeArray[2] }}
    render={({ error, props }) =>
      <Tree
        nodes={sort([
          ...level0FromProps(props),
          ...taxonomyLevel1FromProps(store, props),
          ...taxonomyLevel2FromProps(store, props),
          ...taxonomyLevel3FromProps(store, props),
          ...taxonomyLevel4FromProps(store, props),
          ...taxonomyLevel5FromProps(store, props),
        ])}
      />}
  />

export default enhance(TreeTaxonomyLevel5)
