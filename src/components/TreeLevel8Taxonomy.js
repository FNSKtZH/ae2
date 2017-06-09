// @flow
import React from 'react'
import { QueryRenderer, graphql } from 'react-relay'
import { observer, inject } from 'mobx-react'
import compose from 'recompose/compose'

import environment from '../modules/createRelayEnvironment'
import Tree from './Tree'
import TreeLevel9Taxonomy from './TreeLevel9Taxonomy'
import level1FromProps from '../modules/nodes/level1FromProps'
import level2TaxonomyFromProps from '../modules/nodes/level2TaxonomyFromProps'
import level3TaxonomyFromProps from '../modules/nodes/level3TaxonomyFromProps'
import level4TaxonomyFromProps from '../modules/nodes/level4TaxonomyFromProps'
import level5TaxonomyFromProps from '../modules/nodes/level5TaxonomyFromProps'
import level6TaxonomyFromProps from '../modules/nodes/level6TaxonomyFromProps'
import level7TaxonomyFromProps from '../modules/nodes/level7TaxonomyFromProps'
import level8TaxonomyFromProps from '../modules/nodes/level8TaxonomyFromProps'

const enhance = compose(inject('store'), observer)

const TreeLevel8Taxonomy = ({
  store,
  level1Props,
  level2Props,
  level3Props,
  level4Props,
  level5Props,
  level6Props,
  level7Props,
}: {
  store: Object,
  level1Props: Object,
  level2Props: Object,
  level3Props: Object,
  level4Props: Object,
  level5Props: Object,
  level6Props: Object,
  level7Props: Object,
}) =>
  <QueryRenderer
    environment={environment}
    query={graphql`
      query TreeLevel8TaxonomyQuery($level7: Uuid!) {
        taxonomyObjectById(id: $level7) {
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
    variables={{ level7: store.activeNodeArray[6] }}
    render={({ error, props }) => {
      if (error) {
        return <div>{error.message}</div>
      } else if (props) {
        if (store.activeNodeArray.length === 7) {
          store.tree.setNodes([
            ...level1FromProps(store, level1Props),
            ...level2TaxonomyFromProps(store, level2Props),
            ...level3TaxonomyFromProps(store, level3Props),
            ...level4TaxonomyFromProps(store, level4Props),
            ...level5TaxonomyFromProps(store, level5Props),
            ...level6TaxonomyFromProps(store, level6Props),
            ...level7TaxonomyFromProps(store, level7Props),
            ...level8TaxonomyFromProps(store, props),
          ])
          return <Tree nodes={store.tree.nodes} />
        } else if (store.activeNodeArray.length > 7) {
          return (
            <TreeLevel9Taxonomy
              level1Props={level1Props}
              level2Props={level2Props}
              level3Props={level3Props}
              level4Props={level4Props}
              level5Props={level5Props}
              level6Props={level6Props}
              level7Props={level7Props}
              level8Props={props}
            />
          )
        }
      }
      return <Tree nodes={store.tree.nodes} />
    }}
  />

export default enhance(TreeLevel8Taxonomy)
