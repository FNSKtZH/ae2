// @flow
import React from 'react'
import { QueryRenderer, graphql } from 'react-relay'
import { observer, inject } from 'mobx-react'
import compose from 'recompose/compose'

import environment from '../modules/createRelayEnvironment'
import Tree from './Tree'
import level1FromProps from '../modules/nodes/level1FromProps'
import level2TaxonomyFromProps from '../modules/nodes/level2TaxonomyFromProps'
import level3TaxonomyFromProps from '../modules/nodes/level3TaxonomyFromProps'
import level4TaxonomyFromProps from '../modules/nodes/level4TaxonomyFromProps'
import level5TaxonomyFromProps from '../modules/nodes/level5TaxonomyFromProps'
import level6TaxonomyFromProps from '../modules/nodes/level6TaxonomyFromProps'
import level7TaxonomyFromProps from '../modules/nodes/level7TaxonomyFromProps'
import level8TaxonomyFromProps from '../modules/nodes/level8TaxonomyFromProps'
import level9TaxonomyFromProps from '../modules/nodes/level9TaxonomyFromProps'
import level10TaxonomyFromProps from '../modules/nodes/level10TaxonomyFromProps'

const enhance = compose(inject('store'), observer)

const TreeLevel10Taxonomy = ({
  store,
  level1Props,
  level2Props,
  level3Props,
  level4Props,
  level5Props,
  level6Props,
  level7Props,
  level8Props,
  level9Props,
}: {
  store: Object,
  level1Props: Object,
  level2Props: Object,
  level3Props: Object,
  level4Props: Object,
  level5Props: Object,
  level6Props: Object,
  level7Props: Object,
  level8Props: Object,
  level9Props: Object,
}) =>
  <QueryRenderer
    environment={environment}
    query={graphql`
      query TreeLevel10TaxonomyQuery($level9: Uuid!) {
        taxonomyObjectById(id: $level9) {
          taxonomyObjectsByParentId {
            totalCount
            nodes {
              id
              name
              taxonomyObjectsByParentId {
                totalCount
              }
            }
          }
        }
      }
    `}
    variables={{ level9: store.activeNodeArray[8] }}
    render={({ error, props }) => {
      if (error) {
        return <div>{error.message}</div>
      } else if (props && store.activeNodeArray.length === 9) {
        store.tree.setNodes([
          ...level1FromProps(store, level1Props),
          ...level2TaxonomyFromProps(store, level2Props),
          ...level3TaxonomyFromProps(store, level3Props),
          ...level4TaxonomyFromProps(store, level4Props),
          ...level5TaxonomyFromProps(store, level5Props),
          ...level6TaxonomyFromProps(store, level6Props),
          ...level7TaxonomyFromProps(store, level7Props),
          ...level8TaxonomyFromProps(store, level8Props),
          ...level9TaxonomyFromProps(store, level9Props),
          ...level10TaxonomyFromProps(store, props),
        ])
        return <Tree nodes={store.tree.nodes} />
      }
      return <Tree nodes={store.tree.nodes} />
    }}
  />

export default enhance(TreeLevel10Taxonomy)
