// @flow
import React from 'react'
import { observer, inject } from 'mobx-react'
import compose from 'recompose/compose'
import { QueryRenderer, graphql } from 'react-relay'

import environment from '../modules/createRelayEnvironment'
import Tree from './Tree'

const enhance = compose(inject('store'), observer)

const TreeTaxonomyObjectLevel1 = ({ store }: { store: Object }) => (
  <QueryRenderer
    environment={environment}
    query={graphql`
      query TreeTaxonomyObjectLevel1Query {
        taxonomyObjectLevel1 {
          totalCount
          nodes {
            id
            name
            taxonomyByTaxonomyId {
              category
            }
          }
        }
      }
    `}
    render={({ error, props }) => {
      if (props) {
        if (props.taxonomyObjectLevel1) {
          const nodes = props.taxonomyObjectLevel1.nodes.map((n, index) => ({
            id: n.id,
            url: [
              'Taxonomien',
              props.taxonomyObjectLevel1.taxonomyByTaxonomyId.category,
              props.taxonomyObjectLevel1.name,
              n.name,
            ],
            label: n.name,
            hasChildren: true,
            parentId: 'level1_1',
          }))
          store.nodes.setTaxTaxonomyObjectsNodes(nodes)
        } else {
          store.nodes.setTaxTaxonomyObjectsNodes([])
        }
      }
      return <Tree />
    }}
  />
)

export default enhance(TreeTaxonomyObjectLevel1)
