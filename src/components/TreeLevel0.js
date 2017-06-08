// @flow
import React from 'react'
import { QueryRenderer, graphql } from 'react-relay'
import { observer, inject } from 'mobx-react'
import compose from 'recompose/compose'

import environment from '../modules/createRelayEnvironment'
import Tree from './Tree'
import TreeTaxonomyLevel1 from './TreeTaxonomyLevel1'
import TreePcLevel1 from './TreePcLevel1'
import level0FromProps from '../modules/nodes/level0FromProps'

const enhance = compose(inject('store'), observer)

const TreeLevel0 = ({ store }: { store: Object }) =>
  <QueryRenderer
    environment={environment}
    query={graphql`
      query TreeLevel0Query {
        allPropertyCollections {
          totalCount
        }
        allRelationCollections {
          totalCount
        }
        allCategories {
          totalCount
        }
      }
    `}
    render={({ error, props }) => {
      if (error) {
        return <div>{error.message}</div>
      } else if (props) {
        if (store.activeNodeArray.length === 0) {
          store.setNodes(level0FromProps(store, props.allDataTypes.nodes))
          return <Tree nodes={store.nodes} />
        }
        switch (store.activeNodeArray[0]) {
          case 'Taxonomien':
            return <TreeTaxonomyLevel1 level0Props={props} />
          case 'Eigenschaften-Sammlungen':
            return <TreePcLevel1 level0Props={props} />
          default:
            return <Tree nodes={store.nodes} />
        }
      }
      return <div>Lade Daten</div>
    }}
  />

export default enhance(TreeLevel0)
