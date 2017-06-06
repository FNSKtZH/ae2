// @flow
import React from 'react'
import { QueryRenderer, graphql } from 'react-relay'
import { observer, inject } from 'mobx-react'
import compose from 'recompose/compose'

import environment from '../modules/createRelayEnvironment'
import Tree from './Tree'
import TreeTaxonomyLevel4 from './TreeTaxonomyLevel4'
import level0FromProps from '../modules/nodes/level0FromProps'
import taxonomyLevel1FromProps from '../modules/nodes/taxonomyLevel1FromProps'
import taxonomyLevel2FromProps from '../modules/nodes/taxonomyLevel2FromProps'
import taxonomyLevel3FromProps from '../modules/nodes/taxonomyLevel3FromProps'

const enhance = compose(inject('store'), observer)

const TreeTaxonomyLevel3 = ({
  store,
  level0Props,
  level1Props,
  level2Props,
}: {
  store: Object,
  level0Props: Object,
  level1Props: Object,
  level2Props: Object,
}) =>
  <QueryRenderer
    environment={environment}
    query={graphql`
      query TreeTaxonomyLevel3Query($taxonomyId: Uuid) {
        taxonomyById(id: $taxonomyId) {
          name
          taxonomyObjectLevel1 {
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
    variables={{ taxonomyId: store.activeNodeArray[3] }}
    render={({ error, props }) => {
      if (error) {
        return <div>{error.message}</div>
      } else if (props) {
        if (store.activeNodeArray.length === 3) {
          store.setNodes([
            ...level0FromProps(store, level0Props),
            ...taxonomyLevel1FromProps(store, level1Props),
            ...taxonomyLevel2FromProps(store, level2Props),
            ...taxonomyLevel3FromProps(store, props),
          ])
          return <Tree />
        }
        return (
          <TreeTaxonomyLevel4
            level0Props={level0Props}
            level1Props={level1Props}
            level2Props={level2Props}
            level3Props={props}
          />
        )
      }
      return <div>Loading</div>
    }}
  />

export default enhance(TreeTaxonomyLevel3)
