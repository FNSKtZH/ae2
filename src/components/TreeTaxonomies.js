// @flow
import React from 'react'
import { observer, inject } from 'mobx-react'
import compose from 'recompose/compose'
import { QueryRenderer, graphql } from 'react-relay'

import environment from '../modules/createRelayEnvironment'
import Tree from './Tree'

const enhance = compose(inject('store'), observer)

const TreeTaxonomies = ({ store }: { store: Object }) => (
  <QueryRenderer
    environment={environment}
    query={graphql`
      query TreeTaxonomiesQuery {
        allCategories {
          totalCount
          nodes {
            id
            name
          }
        }
      }
    `}
    render={({ error, props }) => {
      if (props) {
        const nodes = props.allCategories.nodes.map((n, index) => ({
          id: n.id,
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

export default enhance(TreeTaxonomies)
