// @flow
import React from 'react'
import { observer, inject } from 'mobx-react'
import compose from 'recompose/compose'
import { QueryRenderer, graphql } from 'react-relay'

import environment from '../modules/createRelayEnvironment'
import Tree from './Tree'

const enhance = compose(inject('store'), observer)

const TreeTaxonomyObjectsByTaxonomy = ({ store }: { store: Object }) => (
  <QueryRenderer
    environment={environment}
    query={graphql`
      query TreeTaxonomyObjectsByTaxonomyQuery {
        taxonomyByName(name: "CSCF (2009)") {
            id
            name
            category
            taxonomyObjectsByTaxonomyId {
              totalCount
              nodes{
                id
                name
              }
            }
          }
        }
    `}
    render={({ error, props }) => {
      if (props) {
        console.log('props:', props)
        if (props.taxonomyByName) {
          const nodes = props.taxonomyByName.taxonomyObjectsByTaxonomyId.nodes.map(
            (n, index) => ({
              id: n.id,
              url: [
                'Taxonomien',
                props.taxonomyByName.category,
                props.taxonomyByName.name,
                n.name,
              ],
              sort: [1, index],
              label: n.name,
              hasChildren: true,
              parentId: 'level1_1',
            })
          )
          console.log(
            'TreeTaxonomyObjectsByTaxonomy: nodes.length:',
            nodes.length
          )
          store.nodes.setTaxTaxonomyObjectsNodes(nodes)
        } else {
          store.nodes.setTaxTaxonomyObjectsNodes([])
        }
      }
      return <Tree />
    }}
  />
)

export default enhance(TreeTaxonomyObjectsByTaxonomy)
