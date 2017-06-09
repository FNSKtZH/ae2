// @flow
import React from 'react'
import { QueryRenderer, graphql } from 'react-relay'
import { observer, inject } from 'mobx-react'
import compose from 'recompose/compose'

import environment from '../modules/createRelayEnvironment'
import Tree from './Tree'
import TreeTaxonomyLevel6 from './TreeTaxonomyLevel6'
import level0FromProps from '../modules/nodes/level0FromProps'
import taxonomyLevel1FromProps from '../modules/nodes/taxonomyLevel1FromProps'
import taxonomyLevel2FromProps from '../modules/nodes/taxonomyLevel2FromProps'
import taxonomyLevel3FromProps from '../modules/nodes/taxonomyLevel3FromProps'
import taxonomyLevel4FromProps from '../modules/nodes/taxonomyLevel4FromProps'
import taxonomyLevel5FromProps from '../modules/nodes/taxonomyLevel5FromProps'

const enhance = compose(inject('store'), observer)

const TreeTaxonomyLevel5 = ({
  store,
  level0Props,
  level1Props,
  level2Props,
  level3Props,
  level4Props,
}: {
  store: Object,
  level0Props: Object,
  level1Props: Object,
  level2Props: Object,
  level3Props: Object,
  level4Props: Object,
}) =>
  <QueryRenderer
    environment={environment}
    query={graphql`
      query TreeTaxonomyLevel5Query($level5: Uuid!) {
        taxonomyObjectById(id: $level5) {
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
    `}
    variables={{ level5: store.activeNodeArray[4] }}
    render={({ error, props }) => {
      if (error) {
        return <div>{error.message}</div>
      } else if (props) {
        if (store.activeNodeArray.length === 5) {
          store.tree.setNodes([
            ...level0FromProps(store, level0Props),
            ...taxonomyLevel1FromProps(store, level1Props),
            ...taxonomyLevel2FromProps(store, level2Props),
            ...taxonomyLevel3FromProps(store, level3Props),
            ...taxonomyLevel4FromProps(store, level4Props),
            ...taxonomyLevel5FromProps(store, props),
          ])
          return (
            <Tree
              nodes={store.tree.nodes}
              activeNodeArray={store.activeNodeArray}
              activeDataType={store.tree.activeDataType}
              activeCategory={store.tree.activeCategory}
              activeTaxonomy={store.tree.activeTaxonomy}
              activeLevel4={store.tree.activeLevel4}
              activeLevel5={store.tree.activeLevel5}
              activeLevel6={store.tree.activeLevel6}
              activeLevel7={store.tree.activeLevel7}
              activeLevel8={store.tree.activeLevel8}
              activeLevel9={store.tree.activeLevel9}
              activeLevel10={store.tree.activeLevel10}
            />
          )
        } else if (store.activeNodeArray.length > 5) {
          return (
            <TreeTaxonomyLevel6
              level0Props={level0Props}
              level1Props={level1Props}
              level2Props={level2Props}
              level3Props={level3Props}
              level4Props={level4Props}
              level5Props={props}
            />
          )
        }
      }
      return <Tree nodes={store.tree.nodes} />
    }}
  />

export default enhance(TreeTaxonomyLevel5)
