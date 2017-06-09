// @flow
import React from 'react'
import { QueryRenderer, graphql } from 'react-relay'
import { observer, inject } from 'mobx-react'
import compose from 'recompose/compose'

import environment from '../modules/createRelayEnvironment'
import Tree from './Tree'
import TreeLevel8Taxonomy from './TreeLevel8Taxonomy'
import level1FromProps from '../modules/nodes/level1FromProps'
import level2TaxonomyFromProps from '../modules/nodes/level2TaxonomyFromProps'
import level3TaxonomyFromProps from '../modules/nodes/level3TaxonomyFromProps'
import level4TaxonomyFromProps from '../modules/nodes/level4TaxonomyFromProps'
import level5TaxonomyFromProps from '../modules/nodes/level5TaxonomyFromProps'
import level6TaxonomyFromProps from '../modules/nodes/level6TaxonomyFromProps'
import level7TaxonomyFromProps from '../modules/nodes/level7TaxonomyFromProps'

const enhance = compose(inject('store'), observer)

const TreeLevel7Taxonomy = ({
  store,
  level1Props,
  level2Props,
  level3Props,
  level4Props,
  level5Props,
  level6Props,
}: {
  store: Object,
  level1Props: Object,
  level2Props: Object,
  level3Props: Object,
  level4Props: Object,
  level5Props: Object,
  level6Props: Object,
}) =>
  <QueryRenderer
    environment={environment}
    query={graphql`
      query TreeLevel7TaxonomyQuery($level6: Uuid!) {
        taxonomyObjectById(id: $level6) {
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
    variables={{ level6: store.activeNodeArray[5] }}
    render={({ error, props }) => {
      if (error) {
        return <div>{error.message}</div>
      } else if (props) {
        if (store.activeNodeArray.length === 6) {
          store.tree.setNodes([
            ...level1FromProps(store, level1Props),
            ...level2TaxonomyFromProps(store, level2Props),
            ...level3TaxonomyFromProps(store, level3Props),
            ...level4TaxonomyFromProps(store, level4Props),
            ...level5TaxonomyFromProps(store, level5Props),
            ...level6TaxonomyFromProps(store, level6Props),
            ...level7TaxonomyFromProps(store, props),
          ])
          return <Tree nodes={store.tree.nodes} />
        } else if (store.activeNodeArray.length > 6) {
          return (
            <TreeLevel8Taxonomy
              level1Props={level1Props}
              level2Props={level2Props}
              level3Props={level3Props}
              level4Props={level4Props}
              level5Props={level5Props}
              level6Props={level6Props}
              level7Props={props}
            />
          )
        }
      }
      return <Tree nodes={store.tree.nodes} />
    }}
  />

export default enhance(TreeLevel7Taxonomy)
