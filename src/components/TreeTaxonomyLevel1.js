// @flow
import React from 'react'
import { QueryRenderer, graphql } from 'react-relay'
import { observer, inject } from 'mobx-react'
import compose from 'recompose/compose'

import environment from '../modules/createRelayEnvironment'
import Tree from './Tree'
import TreeTaxonomyLevel2 from './TreeTaxonomyLevel2'
import level0FromProps from '../modules/nodes/level0FromProps'
import taxonomyLevel1FromProps from '../modules/nodes/taxonomyLevel1FromProps'

const enhance = compose(inject('store'), observer)

const TreeTaxonomyLevel1 = ({
  store,
  level0Props,
}: {
  store: Object,
  level0Props: Object,
}) =>
  <QueryRenderer
    environment={environment}
    query={graphql`
      query TreeTaxonomyLevel1Query($datatypename: String!) {
        categoryByDataType(datatype: $datatypename) {
          nodes {
            id
            name
            taxonomyByCategory {
              totalCount
            }
          }
        }
      }
    `}
    variables={{ datatypename: store.activeNodeArray[0] }}
    render={({ error, props }) => {
      if (error) {
        return <div>{error.message}</div>
      } else if (props) {
        if (store.activeNodeArray.length === 1) {
          store.tree.setNodes([
            ...level0FromProps(store, level0Props),
            ...taxonomyLevel1FromProps(store, props),
          ])
          return (
            <Tree
              nodes={store.tree.nodes}
              activeNodeArray={store.activeNodeArray}
              activeDataType={store.tree.activeDataType}
              activeCategory={store.tree.activeCategory}
              activeTaxonomy={store.tree.activeTaxonomy}
              activeLevel3={store.tree.activeLevel3}
              activeLevel4={store.tree.activeLevel4}
              activeLevel5={store.tree.activeLevel5}
              activeLevel6={store.tree.activeLevel6}
              activeLevel7={store.tree.activeLevel7}
              activeLevel8={store.tree.activeLevel8}
              activeLevel9={store.tree.activeLevel9}
              activeLevel10={store.tree.activeLevel10}
            />
          )
        } else if (store.activeNodeArray.length > 1) {
          return (
            <TreeTaxonomyLevel2 level0Props={level0Props} level1Props={props} />
          )
        }
      }
      return <Tree nodes={store.tree.nodes} />
    }}
  />

export default enhance(TreeTaxonomyLevel1)
