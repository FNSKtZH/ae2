// @flow
import React from 'react'
import { QueryRenderer, graphql } from 'react-relay'
import { observer, inject } from 'mobx-react'
import compose from 'recompose/compose'
import app from 'ampersand-app'

import Tree from './Tree'
import TreeLevel7Taxonomy from './TreeLevel7Taxonomy'
import level1FromProps from '../modules/nodes/level1FromProps'
import level2TaxonomyFromProps from '../modules/nodes/level2TaxonomyFromProps'
import level3TaxonomyFromProps from '../modules/nodes/level3TaxonomyFromProps'
import level4TaxonomyFromProps from '../modules/nodes/level4TaxonomyFromProps'
import level5TaxonomyFromProps from '../modules/nodes/level5TaxonomyFromProps'
import level6TaxonomyFromProps from '../modules/nodes/level6TaxonomyFromProps'

const enhance = compose(inject('store'), observer)

const TreeLevel6Taxonomy = ({
  store,
  level1Props,
  level2Props,
  level3Props,
  level4Props,
  level5Props,
}: {
  store: Object,
  level1Props: Object,
  level2Props: Object,
  level3Props: Object,
  level4Props: Object,
  level5Props: Object,
}) =>
  <QueryRenderer
    environment={app.environment}
    query={graphql`
      query TreeLevel6TaxonomyQuery($level5: Uuid!) {
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
            ...level1FromProps(store, level1Props),
            ...level2TaxonomyFromProps(store, level2Props),
            ...level3TaxonomyFromProps(store, level3Props),
            ...level4TaxonomyFromProps(store, level4Props),
            ...level5TaxonomyFromProps(store, level5Props),
            ...level6TaxonomyFromProps(store, props),
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
        } else if (store.activeNodeArray.length > 5) {
          return (
            <TreeLevel7Taxonomy
              level1Props={level1Props}
              level2Props={level2Props}
              level3Props={level3Props}
              level4Props={level4Props}
              level5Props={level5Props}
              level6Props={props}
            />
          )
        }
      }
      return <Tree nodes={store.tree.nodes} />
    }}
  />

export default enhance(TreeLevel6Taxonomy)
