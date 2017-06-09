// @flow
import React from 'react'
import { QueryRenderer, graphql } from 'react-relay'
import { observer, inject } from 'mobx-react'
import compose from 'recompose/compose'
import app from 'ampersand-app'

import Tree from './Tree'
import level1FromProps from '../modules/nodes/level1FromProps'
import level2PcFromProps from '../modules/nodes/level2PcFromProps'

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
      query TreeLevel2PcQuery {
        allPropertyCollections {
          nodes {
            id
            name
            propertyCollectionObjectsByPropertyCollectionId {
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
          ...level1FromProps(store, level1Props),
          ...level2PcFromProps(store, props),
        ])
        return <Tree nodes={store.tree.nodes} />
      }
      return <Tree nodes={store.tree.nodes} />
    }}
  />

export default enhance(TreeLevel2Taxonomy)
