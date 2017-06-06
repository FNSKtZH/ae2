// @flow
import React from 'react'
import { QueryRenderer, graphql } from 'react-relay'
import { observer, inject } from 'mobx-react'
import compose from 'recompose/compose'

import environment from '../modules/createRelayEnvironment'
import Tree from './Tree'
import TreeTaxonomyLevel5 from './TreeTaxonomyLevel5'
import level0FromProps from '../modules/nodes/level0FromProps'
import taxonomyLevel1FromProps from '../modules/nodes/taxonomyLevel1FromProps'
import taxonomyLevel2FromProps from '../modules/nodes/taxonomyLevel2FromProps'
import taxonomyLevel3FromProps from '../modules/nodes/taxonomyLevel3FromProps'
import taxonomyLevel4FromProps from '../modules/nodes/taxonomyLevel4FromProps'

const enhance = compose(inject('store'), observer)

const TreeTaxonomyLevel4 = ({
  store,
  level0Props,
  level1Props,
  level2Props,
  level3Props,
}: {
  store: Object,
  level0Props: Object,
  level1Props: Object,
  level2Props: Object,
  level3Props: Object,
}) =>
  <QueryRenderer
    environment={environment}
    query={graphql`
      query TreeTaxonomyLevel4Query($level1: Uuid) {
        allDataTypes {
          nodes {
            nameGerman
            name
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
      if (error) {
        return <div>{error.message}</div>
      } else if (props) {
        if (store.activeNodeArray.length === 4) {
          store.setNodes([
            ...level0FromProps(props),
            ...taxonomyLevel1FromProps(store, props),
            ...taxonomyLevel2FromProps(store, props),
            ...taxonomyLevel3FromProps(store, props),
            ...taxonomyLevel4FromProps(store, props),
          ])
          return <Tree />
        }
        return (
          <TreeTaxonomyLevel5
            level0Props={level0Props}
            level1Props={level1Props}
            level2Props={level2Props}
            level3Props={level3Props}
            level4Props={props}
          />
        )
      }
      return <div>Loading</div>
    }}
  />

export default enhance(TreeTaxonomyLevel4)
