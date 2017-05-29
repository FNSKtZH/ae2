// @flow
import React from 'react'
import { observer, inject } from 'mobx-react'
import compose from 'recompose/compose'
import { QueryRenderer, graphql } from 'react-relay'

import environment from '../modules/createRelayEnvironment'
// import TreeTaxonomyObjectLevel1 from './TreeTaxonomyObjectLevel1'
import Tree from './Tree'

const enhance = compose(inject('store'), observer)

const TreeTaxonomies = ({ store }: { store: Object }) => (
  <QueryRenderer
    environment={environment}
    query={graphql`
      query TreeTaxonomiesQuery {
          categoryByName(name: "Fauna") {
            name
            taxonomiesByCategory {
              totalCount
              nodes {
                id
                name
              }
            }
          }
        }
    `}
    render={({ error, props }) => {
      if (props && props.categoryByName) {
        const nodes = props.categoryByName.taxonomiesByCategory.nodes.map(
          (n, index) => ({
            id: n.id,
            url: ['Taxonomien', props.categoryByName.name, n.name],
            label: n.name,
            hasChildren: true,
            parentId: 'level1_1',
          })
        )
        store.nodes.setTaxTaxonomiesNodes(nodes)
      } else {
        store.nodes.setTaxTaxonomiesNodes([])
      }
      // return <TreeTaxonomyObjectLevel1 />
      return <Tree />
    }}
  />
)

export default enhance(TreeTaxonomies)
