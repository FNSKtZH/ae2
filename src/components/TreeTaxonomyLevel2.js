// @flow
import React from 'react'
import { QueryRenderer, graphql } from 'react-relay'
import { observer, inject } from 'mobx-react'
import compose from 'recompose/compose'

import environment from '../modules/createRelayEnvironment'
import Tree from './Tree'
import TreeTaxonomyLevel3 from './TreeTaxonomyLevel3'
import level0FromProps from '../modules/nodes/level0FromProps'
import taxonomyLevel1FromProps from '../modules/nodes/taxonomyLevel1FromProps'
import taxonomyLevel2FromProps from '../modules/nodes/taxonomyLevel2FromProps'

const enhance = compose(inject('store'), observer)

const TreeTaxonomyLevel2 = ({
  store,
  level0Props,
  level1Props,
}: {
  store: Object,
  level0Props: Object,
  level1Props: Object,
}) =>
  <QueryRenderer
    environment={environment}
    query={graphql`
      query TreeTaxonomyLevel2Query($categoryname: String!) {
        categoryByName(name: $categoryname) {
          taxonomiesByCategory {
            nodes {
              id
              name
              taxonomyObjectLevel1 {
                totalCount
              }
            }
          }
        }
      }
    `}
    variables={{ categoryname: store.activeNodeArray[1] }}
    render={({ error, props }) => {
      if (error) {
        return <div>{error.message}</div>
      } else if (props) {
        if (store.activeNodeArray.length === 2) {
          store.setNodes([
            ...level0FromProps(store, level0Props),
            ...taxonomyLevel1FromProps(store, level1Props),
            ...taxonomyLevel2FromProps(store, props),
          ])
          return <Tree nodes={store.nodes} />
        } else if (store.activeNodeArray.length > 2) {
          return (
            <TreeTaxonomyLevel3
              level0Props={level0Props}
              level1Props={level1Props}
              level2Props={props}
            />
          )
        }
      }
      return <div>Loading</div>
      // why does this not work?
      // return <Tree nodes={store.nodes} />
    }}
  />

export default enhance(TreeTaxonomyLevel2)
