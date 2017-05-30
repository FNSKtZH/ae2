// @flow
import React from 'react'
import { observer, inject } from 'mobx-react'
import compose from 'recompose/compose'
import { QueryRenderer, graphql } from 'react-relay'

import environment from '../modules/createRelayEnvironment'
import TreeTaxonomyObjectLevel1 from './TreeTaxonomyObjectLevel1'

const enhance = compose(inject('store'), observer)

const TreeTaxonomies = ({ store }: { store: Object }) => (
  <QueryRenderer
    environment={environment}
    query={graphql`
      query TreeTaxonomiesQuery {
        allCategories {
            totalCount
            nodes {
              name
              taxonomiesByCategory {
                totalCount
                nodes {
                  id
                  name
                  taxonomyObjectLevel1 {
                    totalCount
                  }
                }
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
            label: `${n.name}${n.taxonomyObjectLevel1.totalCount > 0 ? ` (${n.taxonomyObjectLevel1.totalCount})` : ''}`,
            childrenCount: n.taxonomyObjectLevel1.totalCount,
          })
        )
        store.nodes.setTaxTaxonomiesNodes(nodes)
      } else {
        store.nodes.setTaxTaxonomiesNodes([])
      }
      return <TreeTaxonomyObjectLevel1 />
    }}
  />
)

export default enhance(TreeTaxonomies)
