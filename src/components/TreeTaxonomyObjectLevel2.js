// @flow
import React from 'react'
import { observer, inject } from 'mobx-react'
import compose from 'recompose/compose'
import { QueryRenderer, graphql } from 'react-relay'

import environment from '../modules/createRelayEnvironment'
import Tree from './Tree'

const enhance = compose(inject('store'), observer)

const TreeTaxonomyObjectLevel2 = ({ store }: { store: Object }) => (
  <QueryRenderer
    environment={environment}
    query={graphql`
      query TreeTaxonomyObjectLevel2Query {
        taxonomyObjectLevel2 {
          totalCount
          nodes {
            id
            name
            taxonomyByTaxonomyId {
              category
              name
            }
            taxonomyObjectByParentId {
              name
            }
            taxonomyObjectsByParentId {
              totalCount
            }
          }
        }
      }
    `}
    render={({ error, props }) => {
      if (props) {
        if (props.taxonomyObjectLevel2) {
          const nodes = props.taxonomyObjectLevel2.nodes.map((n, index) => ({
            id: n.id,
            url: [
              'Taxonomien',
              n.taxonomyByTaxonomyId.category,
              n.taxonomyByTaxonomyId.name,
              n.taxonomyObjectByParentId.name,
              n.name,
            ],
            label: `${n.name}${n.taxonomyObjectsByParentId.totalCount > 0 ? ` (${n.taxonomyObjectsByParentId.totalCount})` : ''}`,
            childrenCount: n.taxonomyObjectsByParentId.totalCount,
          }))
          store.nodes.setTaxTaxonomyObjectsNodesLevel2(nodes)
        } else {
          store.nodes.setTaxTaxonomyObjectsNodesLevel2([])
        }
      }
      return <Tree />
    }}
  />
)

export default enhance(TreeTaxonomyObjectLevel2)
