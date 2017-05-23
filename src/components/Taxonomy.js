// @flow
import React from 'react'
import { QueryRenderer, graphql } from 'react-relay'

import environment from '../modules/createRelayEnvironment'

const Taxonomy = () => (
  <QueryRenderer
    environment={environment}
    query={graphql`
        query TaxonomyQuery {
          allCategories {
            nodes {
              name
            }
          }
        }
      `}
    render={({ error, props }) => {
      console.log('props:', props)
      return <div>Taxonomy</div>
    }}
  />
)

export default Taxonomy
