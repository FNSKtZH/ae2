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
}) => (
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
          console.log('TreeTaxonomyLevel2, returning all nodes')
          const nodes = [
            ...level0FromProps(store, level0Props),
            ...taxonomyLevel1FromProps(store, level1Props),
            ...taxonomyLevel2FromProps(store, props),
          ]
          store.setNodes(nodes)
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
      return <div>loading</div>
      // no idea why this does not work
      // while it DOES work in level3...
      /*
      console.log('TreeTaxonomyLevel2, returning loading node')
      const level0Nodes = level0FromProps(store, level0Props)
      const level1Nodes = taxonomyLevel1FromProps(store, level1Props)
      const loadingLevel2Node = {
        id: 'level2Loading',
        url: [store.activeDataType, store.activeCategory.name],
        sort: [store.activeDataType, store.activeCategory.name, 'aaa'],
        label: 'lade Daten',
        childrenCount: 0,
      }
      store.setActiveTaxonomy(loadingLevel2Node)
      const nodes = [...level0Nodes, ...level1Nodes, loadingLevel2Node]
      store.setNodes(nodes)
      return <Tree nodes={store.nodes} />*/
    }}
  />
)

export default enhance(TreeTaxonomyLevel2)
