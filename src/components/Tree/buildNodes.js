/**
 * gets data from AppQuery
 * returns nodes
 */
import get from 'lodash/get'

import level1 from './nodes/level1'
import level2Benutzer from './nodes/level2Benutzer'
import level2Organization from './nodes/level2Organization'
import level2Pc from './nodes/level2Pc'
import level3Pc from './nodes/level3Pc'
import level2Taxonomy from './nodes/level2Taxonomy'
import buildLevel3Objects from './nodes/level3Object'
import buildLevel4Objects from './nodes/level4Object'
import buildLevel5Objects from './nodes/level5Object'
import buildLevel6Objects from './nodes/level6Object'
import buildLevel7Objects from './nodes/level7Object'
import buildLevel8Objects from './nodes/level8Object'
import buildLevel9Objects from './nodes/level9Object'
import buildLevel10Objects from './nodes/level10Object'
import sort from './nodes/sort'

const buildNodes = ({
  treeData,
  activeNodeArray,
  treeDataLoading,
  mobxStore,
}) => {
  let nodes = level1({
    treeData,
    activeNodeArray,
    treeDataLoading,
    mobxStore,
  })
  if (activeNodeArray.length > 0) {
    if (activeNodeArray[0] === 'Eigenschaften-Sammlungen') {
      nodes = [...nodes, ...level2Pc({ treeData })]
      if (activeNodeArray.length > 1) {
        nodes = nodes.concat(
          level3Pc({
            treeData,
          }),
        )
      }
    } else if (activeNodeArray[0] === 'Benutzer' && !!mobxStore.login.token) {
      nodes = [...nodes, ...level2Benutzer({ treeData })]
    } else if (activeNodeArray[0] === 'Organisationen') {
      nodes = [...nodes, ...level2Organization({ treeData, mobxStore })]
    } else if (['Arten', 'Lebensräume'].includes(activeNodeArray[0])) {
      const type = activeNodeArray[0]
      const taxonomies =
        type === 'Arten'
          ? treeData?.artTaxonomies?.nodes ?? []
          : treeData?.lrTaxonomies?.nodes ?? []
      const taxonomySort = type === 'Arten' ? 1 : 2
      nodes = [...nodes, ...level2Taxonomy({ type, taxonomies, taxonomySort })]
      if (activeNodeArray.length > 1) {
        const taxonomy = taxonomies.find((n) => n.id === activeNodeArray[1])
        const level3Objects = treeData?.taxonomyObjectLevel1?.nodes ?? []
        nodes = nodes.concat(
          buildLevel3Objects({
            type,
            treeData,
            taxonomy,
            taxonomySort,
            level3Objects,
          }),
        )
        if (activeNodeArray.length > 2) {
          const level3Object = level3Objects.find(
            (n) => n.id === activeNodeArray[2],
          )
          const level4Objects =
            treeData?.level4Object?.objectsByParentId?.nodes ?? []
          nodes = nodes.concat(
            buildLevel4Objects({
              type,
              treeData,
              taxonomy,
              taxonomySort,
              level3Object,
              level4Objects,
            }),
          )
          if (activeNodeArray.length > 3) {
            const level4Object = level4Objects.find(
              (n) => n.id === activeNodeArray[3],
            )
            const level5Objects =
              treeData?.level5Object?.objectsByParentId?.nodes ?? []
            nodes = nodes.concat(
              buildLevel5Objects({
                type,
                treeData,
                taxonomy,
                taxonomySort,
                level3Object,
                level4Object,
                level5Objects,
              }),
            )
            if (activeNodeArray.length > 4) {
              const level5Object = level5Objects.find(
                (n) => n.id === activeNodeArray[4],
              )
              nodes = nodes.concat(
                buildLevel6Objects({
                  type,
                  treeData,
                  taxonomy,
                  taxonomySort,
                  level3Object,
                  level4Object,
                  level5Object,
                }),
              )
              if (activeNodeArray.length > 5) {
                const activeLevel6ObjectNodes = get(
                  treeData,
                  'level6Object.objectsByParentId.nodes',
                  [],
                )
                const activeLevel6Object =
                  activeLevel6ObjectNodes &&
                  activeLevel6ObjectNodes.find(
                    (n) => n.id === activeNodeArray[5],
                  )
                const activeLevel6ObjectName =
                  activeLevel6Object && activeLevel6Object.name
                const activeLevel6ObjectId =
                  activeLevel6Object && activeLevel6Object.id
                nodes = nodes.concat(
                  buildLevel7Objects({
                    type,
                    treeData,
                    taxonomy,
                    taxonomySort,
                    level3Object,
                    level4Object,
                    level5Object,
                    activeLevel6ObjectName,
                    activeLevel6ObjectId,
                  }),
                )
                if (activeNodeArray.length > 6) {
                  const activeLevel7ObjectNodes = get(
                    treeData,
                    'level7Object.objectsByParentId.nodes',
                    [],
                  )
                  const activeLevel7Object =
                    activeLevel7ObjectNodes &&
                    activeLevel7ObjectNodes.find(
                      (n) => n.id === activeNodeArray[6],
                    )
                  const activeLevel7ObjectName =
                    activeLevel7Object && activeLevel7Object.name
                  const activeLevel7ObjectId =
                    activeLevel7Object && activeLevel7Object.id
                  nodes = nodes.concat(
                    buildLevel8Objects({
                      type,
                      treeData,
                      taxonomy,
                      taxonomySort,
                      level3Object,
                      level4Object,
                      level5Object,
                      activeLevel6ObjectName,
                      activeLevel6ObjectId,
                      activeLevel7ObjectName,
                      activeLevel7ObjectId,
                    }),
                  )
                  if (activeNodeArray.length > 7) {
                    const activeLevel8ObjectNodes = get(
                      treeData,
                      'level8Object.objectsByParentId.nodes',
                      [],
                    )
                    const activeLevel8Object =
                      activeLevel8ObjectNodes &&
                      activeLevel8ObjectNodes.find(
                        (n) => n.id === activeNodeArray[7],
                      )
                    const activeLevel8ObjectName =
                      activeLevel8Object && activeLevel8Object.name
                    const activeLevel8ObjectId =
                      activeLevel8Object && activeLevel8Object.id
                    nodes = nodes.concat(
                      buildLevel9Objects({
                        type,
                        treeData,
                        taxonomy,
                        taxonomySort,
                        level3Object,
                        level4Object,
                        level5Object,
                        activeLevel6ObjectName,
                        activeLevel6ObjectId,
                        activeLevel7ObjectName,
                        activeLevel7ObjectId,
                        activeLevel8ObjectName,
                        activeLevel8ObjectId,
                      }),
                    )
                    if (activeNodeArray.length > 8) {
                      const activeLevel9ObjectNodes = get(
                        treeData,
                        'level9Object.objectsByParentId.nodes',
                        [],
                      )
                      const activeLevel9Object =
                        activeLevel9ObjectNodes &&
                        activeLevel9ObjectNodes.find(
                          (n) => n.id === activeNodeArray[8],
                        )
                      const activeLevel9ObjectName =
                        activeLevel9Object && activeLevel9Object.name
                      const activeLevel9ObjectId =
                        activeLevel9Object && activeLevel9Object.id
                      nodes = nodes.concat(
                        buildLevel10Objects({
                          type,
                          treeData,
                          taxonomy,
                          taxonomySort,
                          level3Object,
                          level4Object,
                          level5Object,
                          activeLevel6ObjectName,
                          activeLevel6ObjectId,
                          activeLevel7ObjectName,
                          activeLevel7ObjectId,
                          activeLevel8ObjectName,
                          activeLevel8ObjectId,
                          activeLevel9ObjectName,
                          activeLevel9ObjectId,
                        }),
                      )
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  return sort(nodes)
}

export default buildNodes
