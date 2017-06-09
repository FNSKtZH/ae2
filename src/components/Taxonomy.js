// @flow
import React from 'react'
import { QueryRenderer, graphql } from 'react-relay'
import { observer, inject } from 'mobx-react'
import compose from 'recompose/compose'
import app from 'ampersand-app'

const enhance = compose(inject('store'), observer)

const Taxonomy = ({ store }: { store: Object }) => {
  return (
    <QueryRenderer
      environment={app.environment}
      query={graphql`
        query TaxonomyQuery {
          allCategories {
            nodes {
              name
            }
          }
        }
      `}
      render={({ error, props }) => <div>Taxonomy</div>}
    />
  )
}

export default enhance(Taxonomy)
