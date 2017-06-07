// @flow
import React from 'react'
import { QueryRenderer, graphql } from 'react-relay'
import { observer, inject } from 'mobx-react'
import compose from 'recompose/compose'

import environment from '../modules/createRelayEnvironment'
import Tree from './Tree'
import TreeTaxonomyLevel7 from './TreeTaxonomyLevel7'
import level0FromProps from '../modules/nodes/level0FromProps'
import taxonomyLevel1FromProps from '../modules/nodes/taxonomyLevel1FromProps'
import taxonomyLevel2FromProps from '../modules/nodes/taxonomyLevel2FromProps'
import taxonomyLevel3FromProps from '../modules/nodes/taxonomyLevel3FromProps'
import taxonomyLevel4FromProps from '../modules/nodes/taxonomyLevel4FromProps'
import taxonomyLevel5FromProps from '../modules/nodes/taxonomyLevel5FromProps'
import taxonomyLevel6FromProps from '../modules/nodes/taxonomyLevel6FromProps'

const enhance = compose(inject('store'), observer)

const TreeTaxonomyLevel6 = ({
  store,
  level0Props,
  level1Props,
  level2Props,
  level3Props,
  level4Props,
  level5Props,
}: {
  store: Object,
  level0Props: Object,
  level1Props: Object,
  level2Props: Object,
  level3Props: Object,
  level4Props: Object,
  level5Props: Object,
}) =>
  <QueryRenderer
    environment={environment}
    query={graphql`
      query TreeTaxonomyLevel6Query($level6: Uuid!) {
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
          store.setNodes([
            ...level0FromProps(store, level0Props),
            ...taxonomyLevel1FromProps(store, level1Props),
            ...taxonomyLevel2FromProps(store, level2Props),
            ...taxonomyLevel3FromProps(store, level3Props),
            ...taxonomyLevel4FromProps(store, level4Props),
            ...taxonomyLevel5FromProps(store, level5Props),
            ...taxonomyLevel6FromProps(store, props),
          ])
          return <Tree nodes={store.nodes} />
        } else if (store.activeNodeArray.length > 6) {
          return (
            <TreeTaxonomyLevel7
              level0Props={level0Props}
              level1Props={level1Props}
              level2Props={level2Props}
              level3Props={level3Props}
              level4Props={level4Props}
              level5Props={level5Props}
              level6Props={props}
            />
          )
        }
      }
      const level0Nodes = level0FromProps(store, level0Props)
      const level1Nodes = taxonomyLevel1FromProps(store, level1Props)
      const level2Nodes = taxonomyLevel2FromProps(store, level2Props)
      const level3Nodes = taxonomyLevel3FromProps(store, level3Props)
      const level4Nodes = taxonomyLevel4FromProps(store, level4Props)
      const level5Nodes = taxonomyLevel5FromProps(store, level5Props)
      const loadingLevel6Node = {
        id: 'level6Loading',
        url: [
          store.activeDataType,
          store.activeCategory.name,
          store.activeTaxonomy.id,
          store.activeLevel3.id,
          store.activeLevel4.id,
          store.activeLevel5.id,
        ],
        sort: [
          store.activeDataType,
          store.activeCategory.name,
          store.activeTaxonomy.name,
          store.activeLevel3.name,
          store.activeLevel4.name,
          store.activeLevel5.name,
          'aaa',
        ],
        label: 'lade Daten',
        childrenCount: 0,
      }
      store.setActiveLevel6(loadingLevel6Node)
      store.setNodes([
        ...level0Nodes,
        ...level1Nodes,
        ...level2Nodes,
        ...level3Nodes,
        ...level4Nodes,
        ...level5Nodes,
        loadingLevel6Node,
      ])
      return <Tree nodes={store.nodes} />
    }}
  />

export default enhance(TreeTaxonomyLevel6)
