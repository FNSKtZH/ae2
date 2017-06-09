// @flow
import React from 'react'
import { QueryRenderer, graphql } from 'react-relay'
import { observer, inject } from 'mobx-react'
import compose from 'recompose/compose'

import environment from '../modules/createRelayEnvironment'
import Tree from './Tree'
import TreeLevel5Taxonomy from './TreeLevel5Taxonomy'
import level1FromProps from '../modules/nodes/level1FromProps'
import level2TaxonomyFromProps from '../modules/nodes/level2TaxonomyFromProps'
import level3TaxonomyFromProps from '../modules/nodes/level3TaxonomyFromProps'
import level4TaxonomyFromProps from '../modules/nodes/level4TaxonomyFromProps'

const enhance = compose(inject('store'), observer)

const TreeLevel4Taxonomy = ({
  store,
  level1Props,
  level2Props,
  level3Props,
}: {
  store: Object,
  level1Props: Object,
  level2Props: Object,
  level3Props: Object,
}) =>
  <QueryRenderer
    environment={environment}
    query={graphql`
      query TreeLevel4TaxonomyQuery($taxonomyId: Uuid!) {
        taxonomyById(id: $taxonomyId) {
          taxonomyObjectLevel1 {
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
    variables={{ taxonomyId: store.activeNodeArray[2] }}
    render={({ error, props }) => {
      if (error) {
        return <div>{error.message}</div>
      } else if (props) {
        if (store.activeNodeArray.length === 3) {
          store.tree.setNodes([
            ...level1FromProps(store, level1Props),
            ...level2TaxonomyFromProps(store, level2Props),
            ...level3TaxonomyFromProps(store, level3Props),
            ...level4TaxonomyFromProps(store, props),
          ])
          return (
            <Tree
              nodes={store.tree.nodes}
              activeNodeArray={store.activeNodeArray}
              activeLevel1={store.tree.activeLevel1}
              activeLevel2Taxonomy={store.tree.activeLevel2Taxonomy}
              activeLevel3Taxonomy={store.tree.activeLevel3Taxonomy}
              activeLevel5Taxonomy={store.tree.activeLevel5Taxonomy}
              activeLevel6Taxonomy={store.tree.activeLevel6Taxonomy}
              activeLevel7Taxonomy={store.tree.activeLevel7Taxonomy}
              activeLevel8Taxonomy={store.tree.activeLevel8Taxonomy}
              activeLevel9Taxonomy={store.tree.activeLevel9Taxonomy}
              activeLevel10Taxonomy={store.tree.activeLevel10Taxonomy}
            />
          )
        } else if (store.activeNodeArray.length > 3) {
          return (
            <TreeLevel5Taxonomy
              level1Props={level1Props}
              level2Props={level2Props}
              level3Props={level3Props}
              level4Props={props}
            />
          )
        }
      }
      const level0Nodes = level1FromProps(store, level1Props)
      const level1Nodes = level2TaxonomyFromProps(store, level2Props)
      const level2Nodes = level3TaxonomyFromProps(store, level3Props)
      const loadingLevel3Node = {
        loadingNode: true,
        id: 'level3Loading',
        url: [
          store.tree.activeLevel1,
          store.tree.activeLevel2Taxonomy.name,
          store.tree.activeLevel3Taxonomy.id,
          'level3Loading',
        ],
        sort: [
          store.tree.activeLevel1,
          store.tree.activeLevel2Taxonomy.name,
          store.tree.activeLevel3Taxonomy.name,
          'aaa',
        ],
        label: 'lade Daten',
        childrenCount: 0,
      }
      store.tree.setActiveLevel4Taxonomy(loadingLevel3Node)
      store.tree.setNodes([
        ...level0Nodes,
        ...level1Nodes,
        ...level2Nodes,
        loadingLevel3Node,
      ])
      return <Tree nodes={store.tree.nodes} />
    }}
  />

export default enhance(TreeLevel4Taxonomy)
