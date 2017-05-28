// @flow
import React from 'react'
import { observer, inject } from 'mobx-react'
import compose from 'recompose/compose'
import { QueryRenderer, graphql } from 'react-relay'

import environment from '../modules/createRelayEnvironment'
import TreeTaxonomies from './TreeTaxonomies'

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
          id: n.name,
          url: ['Taxonomien', n.name],
          label: n.name,
          hasChildren: true,
          parentId: 'level1_1',
        }))
        store.nodes.setTaxCategoriesNodes(nodes)
      }
      return <TreeTaxonomies />
    }}
  />
)

export default enhance(TreeCategories)
