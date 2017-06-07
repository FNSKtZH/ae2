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
          store.setNodes([
            ...level0FromProps(store, level0Props),
            ...taxonomyLevel1FromProps(store, props),
          ])
          return <Tree />
        } else if (store.activeNodeArray.length > 1) {
          return (
            <TreeTaxonomyLevel2 level0Props={level0Props} level1Props={props} />
          )
        }
      }
      return <div>Loading</div>
    }}
  />

export default enhance(TreeTaxonomyLevel1)
