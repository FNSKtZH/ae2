// @flow
import React from 'react'
import { QueryRenderer, graphql } from 'react-relay'
import { observer, inject } from 'mobx-react'
import compose from 'recompose/compose'

import environment from '../modules/createRelayEnvironment'
import Tree from './Tree'

const enhance = compose(inject('store'), observer)

const TreeTaxonomyLevel10 = ({ store }: { store: Object }) =>
  <QueryRenderer
    environment={environment}
    query={graphql`
      query TreeTaxonomyLevel10Query($level1: Uuid) {
        allDataTypes {
          nodes {
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
    render={({ error, props }) => {
      if (props) {
        console.log('TreeTaxonomyLevel10: props:', props)
      }
      return <Tree />
    }}
  />

export default enhance(TreeTaxonomyLevel10)
