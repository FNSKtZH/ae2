// @flow
import React from 'react'
import { observer, inject } from 'mobx-react'
import compose from 'recompose/compose'
import { QueryRenderer, graphql } from 'react-relay'

import environment from '../modules/createRelayEnvironment'
import Tree from './Tree'

const enhance = compose(inject('store'), observer)

/**
 * TODO:
 * depending on top level node
 * query for taxonomies, property_collections or relation_collections
 * for the meantime only querying taxonomies
 */
const TreeCategories = ({ store }: { store: Object }) => (
  <QueryRenderer
    environment={environment}
    query={graphql`
      query TreeCategoriesQuery {
        allCategories {
          totalCount
          nodes {
            name
          }
        }
      }
    `}
    render={({ error, props }) => {
      if (props) {
        const nodes = props.allCategories.nodes.map((n, index) => ({
          id: `level1_1_level2_${index}`,
          url: ['Taxonomien', n.name],
          sort: [1, index],
          label: n.name,
          hasChildren: true,
          parentId: 'level1_1',
        }))
        store.nodes.setTaxCategoriesNodes(nodes)
      }
      return <Tree />
    }}
  />
)

export default enhance(TreeCategories)
