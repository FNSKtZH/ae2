// @flow
import React from 'react'
import { QueryRenderer, graphql } from 'react-relay'
import { observer, inject } from 'mobx-react'
import compose from 'recompose/compose'

import environment from '../modules/createRelayEnvironment'
import Tree from './Tree'
import TreeTaxonomyLevel1 from './TreeTaxonomyLevel1'
import level0FromProps from '../modules/nodes/level0FromProps'

const enhance = compose(inject('store'), observer)

const TreeLevel0 = ({ store }: { store: Object }) =>
  <QueryRenderer
    environment={environment}
    query={graphql`
      query TreeLevel0Query {
        allDataTypes {
          nodes {
            nameGerman
            name
            propertyCollectionsByDataType {
              totalCount
            }
            relationCollectionsByDataType {
              totalCount
            }
            categoriesByDataType {
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
        console.log(
          'TreeLevel0: store.activeNodeArray.length:',
          store.activeNodeArray.length
        )
        if (store.activeNodeArray.length === 0) {
          store.setNodes(level0FromProps(store, props.allDataTypes.nodes))
          return <Tree />
        }
        return <TreeTaxonomyLevel1 level0Props={props} />
      }
      return <div>Loading</div>
    }}
  />

export default enhance(TreeLevel0)
