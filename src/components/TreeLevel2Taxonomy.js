// @flow
import React from 'react'
import { QueryRenderer, graphql } from 'react-relay'
import { observer, inject } from 'mobx-react'
import compose from 'recompose/compose'
import app from 'ampersand-app'

import Tree from './Tree'
import TreeLevel3Taxonomy from './TreeLevel3Taxonomy'
import level1FromProps from '../modules/nodes/level1FromProps'
import level2TaxonomyFromProps from '../modules/nodes/level2TaxonomyFromProps'

const enhance = compose(inject('store'), observer)

const TreeLevel2Taxonomy = ({
  store,
  level1Props,
}: {
  store: Object,
  level1Props: Object,
}) =>
  <QueryRenderer
    environment={app.environment}
    query={graphql`
      query TreeLevel2TaxonomyQuery($datatypename: String!) {
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
            ...level1FromProps(store, level1Props),
            ...level2TaxonomyFromProps(store, props),
          ])
          return (
            <Tree
              nodes={store.tree.nodes}
              activeNodeArray={store.activeNodeArray}
              activeLevel1={store.tree.activeLevel1}
              activeLevel2Taxonomy={store.tree.activeLevel2Taxonomy}
              activeLevel3Taxonomy={store.tree.activeLevel3Taxonomy}
              activeLevel4Taxonomy={store.tree.activeLevel4Taxonomy}
              activeLevel5Taxonomy={store.tree.activeLevel5Taxonomy}
              activeLevel6Taxonomy={store.tree.activeLevel6Taxonomy}
              activeLevel7Taxonomy={store.tree.activeLevel7Taxonomy}
              activeLevel8Taxonomy={store.tree.activeLevel8Taxonomy}
              activeLevel9Taxonomy={store.tree.activeLevel9Taxonomy}
              activeLevel10Taxonomy={store.tree.activeLevel10Taxonomy}
            />
          )
        } else if (store.activeNodeArray.length > 1) {
          return (
            <TreeLevel3Taxonomy level1Props={level1Props} level2Props={props} />
          )
        }
      }
      return <Tree nodes={store.tree.nodes} />
    }}
  />

export default enhance(TreeLevel2Taxonomy)
