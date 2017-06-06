// @flow
import React from 'react'
import { QueryRenderer, graphql } from 'react-relay'
import { inject } from 'mobx-react'
import compose from 'recompose/compose'

import environment from '../modules/createRelayEnvironment'
import Tree from './Tree'

const enhance = compose(inject('store'))

const TreeTaxonomyLevel8 = ({ store }: { store: Object }) =>
  <QueryRenderer
    environment={environment}
    query={graphql`
      query TreeTaxonomyLevel8Query($categoryname: String) {
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
                taxonomyByCategory(categoryname: $categoryname) {
                  totalCount
                  nodes {
                    id
                    name
                    isCategoryStandard
                    taxonomyObjectLevel1(taxonomyId: "5444e7eb-177f-4faf-ba44-0e3da1b391e0") {
                      totalCount
                      nodes {
                        id
                        name
                        taxonomyObjectsByParentId(condition: {parentId: "5f8f6fac-fe63-49c5-a143-f2e6e2174602"}) {
                          totalCount
                          nodes {
                            id
                            name
                            taxonomyObjectsByParentId(condition: {parentId: "75839957-4706-40d6-bf72-7ad13906ab5f"}) {
                              totalCount
                              nodes {
                                id
                                name
                                taxonomyObjectsByParentId(condition: {parentId: "a011dc29-dc05-4540-a791-1a4976905290"}) {
                                  totalCount
                                  nodes {
                                    id
                                    name
                                    taxonomyObjectsByParentId(condition: {parentId: "310212c8-2f89-43c5-9db8-d3c3f6ca8b0b"}) {
                                      totalCount
                                      nodes {
                                        id
                                        name
                                        taxonomyObjectsByParentId(condition: {parentId: "310212c8-2f89-43c5-9db8-d3c3f6ca8b0b"}) {
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
    `}
    variables={{ categoryname: store.activeNodeArray[1] }}
    render={({ error, props }) => {
      if (props) {
        console.log('TreeTaxonomyLevel8: props:', props)
      }
      return <Tree />
    }}
  />

export default enhance(TreeTaxonomyLevel8)
