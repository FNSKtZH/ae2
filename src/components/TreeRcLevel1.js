// @flow
import React from 'react'
import { QueryRenderer, graphql } from 'react-relay'
import { observer, inject } from 'mobx-react'
import compose from 'recompose/compose'

import environment from '../modules/createRelayEnvironment'
import Tree from './Tree'
import level1FromProps from '../modules/nodes/level1FromProps'
import rcLevel1FromProps from '../modules/nodes/rcLevel1FromProps'

const enhance = compose(inject('store'), observer)

const TreeLevel2Taxonomy = ({
  store,
  level0Props,
}: {
  store: Object,
  level0Props: Object,
}) =>
  <QueryRenderer
    environment={environment}
    query={graphql`
      query TreeRcLevel1Query {
        allRelationCollections {
          nodes {
            id
            name
            relationCollectionObjectsByRelationCollectionId {
              totalCount
            }
          }
        }
      }
    `}
    render={({ error, props }) => {
      if (error) {
        return <div>{error.message}</div>
      } else if (props) {
        store.tree.setNodes([
          ...level1FromProps(store, level0Props),
          ...rcLevel1FromProps(store, props),
        ])
        return <Tree nodes={store.tree.nodes} />
      }
      return <Tree nodes={store.tree.nodes} />
    }}
  />

export default enhance(TreeLevel2Taxonomy)
