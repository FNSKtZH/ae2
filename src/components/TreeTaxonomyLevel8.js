// @flow
import React from 'react'
import { QueryRenderer, graphql } from 'react-relay'
import { observer, inject } from 'mobx-react'
import compose from 'recompose/compose'

import environment from '../modules/createRelayEnvironment'
import Tree from './Tree'
import TreeTaxonomyLevel9 from './TreeTaxonomyLevel9'
import level0FromProps from '../modules/nodes/level0FromProps'
import taxonomyLevel1FromProps from '../modules/nodes/taxonomyLevel1FromProps'
import taxonomyLevel2FromProps from '../modules/nodes/taxonomyLevel2FromProps'
import taxonomyLevel3FromProps from '../modules/nodes/taxonomyLevel3FromProps'
import taxonomyLevel4FromProps from '../modules/nodes/taxonomyLevel4FromProps'
import taxonomyLevel5FromProps from '../modules/nodes/taxonomyLevel5FromProps'
import taxonomyLevel6FromProps from '../modules/nodes/taxonomyLevel6FromProps'
import taxonomyLevel7FromProps from '../modules/nodes/taxonomyLevel7FromProps'
import taxonomyLevel8FromProps from '../modules/nodes/taxonomyLevel8FromProps'

const enhance = compose(inject('store'), observer)

const TreeTaxonomyLevel8 = ({
  store,
  level0Props,
  level1Props,
  level2Props,
  level3Props,
  level4Props,
  level5Props,
  level6Props,
  level7Props,
}: {
  store: Object,
  level0Props: Object,
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
      query TreeTaxonomyLevel8Query($level8: Uuid!) {
        taxonomyObjectById(id: $level8) {
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
    variables={{ level8: store.activeNodeArray[7] }}
    render={({ error, props }) => {
      if (error) {
        return <div>{error.message}</div>
      } else if (props) {
        if (store.activeNodeArray.length === 8) {
          store.setNodes([
            ...level0FromProps(store, level0Props),
            ...taxonomyLevel1FromProps(store, level1Props),
            ...taxonomyLevel2FromProps(store, level2Props),
            ...taxonomyLevel3FromProps(store, level3Props),
            ...taxonomyLevel4FromProps(store, level4Props),
            ...taxonomyLevel5FromProps(store, level5Props),
            ...taxonomyLevel6FromProps(store, level6Props),
            ...taxonomyLevel7FromProps(store, level7Props),
            ...taxonomyLevel8FromProps(store, props),
          ])
          return <Tree />
        } else if (store.activeNodeArray.length > 8) {
          return (
            <TreeTaxonomyLevel9
              level0Props={level0Props}
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
      return <div>Loading</div>
    }}
  />

export default enhance(TreeTaxonomyLevel8)
