// @flow
import React from 'react'
import { QueryRenderer, graphql } from 'react-relay'

import environment from '../modules/createRelayEnvironment'

const Taxonomy = () => {
  return (
    <div>
      Taxonomie
      {/*<QueryRenderer
        environment={environment}
        query={graphql`
            query Taxonomy {
              allCategories {
                nodes {
                  name
                }
              }
            }
          `}
        render={(error, props) => {
          console.log('props:', props)
        }}
      />*/}
    </div>
  )
}

export default Taxonomy
