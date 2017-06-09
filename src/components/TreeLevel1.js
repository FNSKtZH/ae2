// @flow
import React from 'react'
import { QueryRenderer, graphql } from 'react-relay'
import { observer, inject } from 'mobx-react'
import compose from 'recompose/compose'

import environment from '../modules/createRelayEnvironment'
import Tree from './Tree'
import TreeLevel2Taxonomy from './TreeLevel2Taxonomy'
import TreePcLevel1 from './TreePcLevel1'
import TreeRcLevel1 from './TreeRcLevel1'
import level1FromProps from '../modules/nodes/level1FromProps'

const enhance = compose(inject('store'), observer)

const TreeLevel1 = ({ store }: { store: Object }) =>
  <QueryRenderer
    environment={environment}
    query={graphql`
      query TreeLevel1Query {
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
          store.tree.setNodes(level1FromProps(store, props))
          return <Tree nodes={store.tree.nodes} />
        }
        switch (store.activeNodeArray[0]) {
          case 'Taxonomien': {
            store.tree.setActiveDataType('Taxonomien')
            return <TreeLevel2Taxonomy level0Props={props} />
          }
          case 'Eigenschaften-Sammlungen': {
            store.tree.setActiveDataType('Eigenschaften-Sammlungen')
            return <TreePcLevel1 level0Props={props} />
          }
          case 'Beziehungs-Sammlungen': {
            store.tree.setActiveDataType('Beziehungs-Sammlungen')
            return <TreeRcLevel1 level0Props={props} />
          }
          default:
            return <Tree nodes={store.tree.nodes} />
        }
      }
      return <div>Lade Daten</div>
    }}
  />

export default enhance(TreeLevel1)
