// @flow
import React from 'react'
import { QueryRenderer, graphql } from 'react-relay'
import { inject } from 'mobx-react'
import compose from 'recompose/compose'

import environment from '../modules/createRelayEnvironment'
import Tree from './Tree'
import level0FromProps from '../modules/nodes/level0FromProps'
import taxonomyLevel1FromProps from '../modules/nodes/taxonomyLevel1FromProps'

const enhance = compose(inject('store'))

const TreeTaxonomyLevel1 = ({ store }: { store: Object }) => (
  <QueryRenderer
    environment={environment}
    query={graphql`
      query TreeTaxonomyLevel1Query {
        allDataTypes {
          nodes {
            nameGerman
            name
            propertyCollectionsByDataType {
              totalCount
            }
            relationCollectionsByDataType {
              totalCount
            }
            categoriesByDataType {
              totalCount
              nodes {
                id
                name
                taxonomiesByCategory {
                  totalCount
                }
              }
            }
          }
        }
      }
    `}
    render={({ error, props }) => (
      <Tree
        nodes={[
          ...level0FromProps(props),
          ...taxonomyLevel1FromProps(store, props),
        ]}
      />
    )}
  />
)

export default enhance(TreeTaxonomyLevel1)
