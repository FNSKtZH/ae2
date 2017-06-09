// @flow
import React from 'react'
import { QueryRenderer, graphql } from 'react-relay'
import { observer, inject } from 'mobx-react'
import compose from 'recompose/compose'

import environment from '../modules/createRelayEnvironment'
import Tree from './Tree'
import TreeLevel4Taxonomy from './TreeLevel4Taxonomy'
import level1FromProps from '../modules/nodes/level1FromProps'
import level2TaxonomyFromProps from '../modules/nodes/level2TaxonomyFromProps'
import level3TaxonomyFromProps from '../modules/nodes/level3TaxonomyFromProps'

const enhance = compose(inject('store'), observer)

const TreeLevel3Taxonomy = ({
  store,
  level1Props,
  level2Props,
}: {
  store: Object,
  level1Props: Object,
  level2Props: Object,
}) =>
  <QueryRenderer
    environment={environment}
    query={graphql`
      query TreeLevel3TaxonomyQuery($categoryname: String!) {
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
          // console.log('TreeLevel3Taxonomy, returning all nodes')
          const nodes = [
            ...level1FromProps(store, level1Props),
            ...level2TaxonomyFromProps(store, level2Props),
            ...level3TaxonomyFromProps(store, props),
          ]
          store.tree.setNodes(nodes)
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
        } else if (store.activeNodeArray.length > 2) {
          return (
            <TreeLevel4Taxonomy
              level1Props={level1Props}
              level2Props={level2Props}
              level3Props={props}
            />
          )
        }
      }
      return <Tree nodes={store.tree.nodes} />
    }}
  />

export default enhance(TreeLevel3Taxonomy)
