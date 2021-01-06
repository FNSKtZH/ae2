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
import level3Object from './nodes/level3Object'
import level4Object from './nodes/level4Object'
import level5Object from './nodes/level5Object'
import level6Object from './nodes/level6Object'
import level7Object from './nodes/level7Object'
import level8Object from './nodes/level8Object'
import level9Object from './nodes/level9Object'
import level10Object from './nodes/level10Object'
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
      const level2Data =
        type === 'Arten'
          ? treeData?.artTaxonomies?.nodes ?? []
          : treeData?.lrTaxonomies?.nodes ?? []
      nodes = [...nodes, ...level2Taxonomy({ type, level2Data })]
      if (activeNodeArray.length > 1) {
        const taxonomy = level2Data.find((n) => n.id === activeNodeArray[1])
        const taxonomyName = taxonomy?.name ?? ''
        nodes = nodes.concat(
          level3Object({
            type,
            treeData,
            taxonomy,
          }),
        )
        if (activeNodeArray.length > 2) {
          const activeLevel3ObjectNodes =
            treeData?.taxonomyObjectLevel1?.nodes ?? []
          const activeLevel3Object = activeLevel3ObjectNodes.find(
            (n) => n.id === activeNodeArray[2],
          )
          const activeLevel3ObjectName = activeLevel3Object?.name
          const activeLevel3ObjectId = activeLevel3Object?.id
          nodes = nodes.concat(
            level4Object({
              treeData,
              taxonomyName,
              activeLevel3ObjectName,
              activeLevel3ObjectId,
            }),
          )
          if (activeNodeArray.length > 3) {
            const activeLevel4ObjectNodes = get(
              treeData,
              'level4Object.objectsByParentId.nodes',
              [],
            )
            const activeLevel4Object =
              activeLevel4ObjectNodes &&
              activeLevel4ObjectNodes.find((n) => n.id === activeNodeArray[3])
            const activeLevel4ObjectName =
              activeLevel4Object && activeLevel4Object.name
            const activeLevel4ObjectId =
              activeLevel4Object && activeLevel4Object.id

            nodes = nodes.concat(
              level5Object({
                treeData,
                taxonomyName,
                activeLevel3ObjectName,
                activeLevel3ObjectId,
                activeLevel4ObjectName,
                activeLevel4ObjectId,
              }),
            )
            if (activeNodeArray.length > 4) {
              const activeLevel5ObjectNodes = get(
                treeData,
                'level5Object.objectsByParentId.nodes',
                [],
              )
              const activeLevel5Object =
                activeLevel5ObjectNodes &&
                activeLevel5ObjectNodes.find((n) => n.id === activeNodeArray[4])
              const activeLevel5ObjectName =
                activeLevel5Object && activeLevel5Object.name
              const activeLevel5ObjectId =
                activeLevel5Object && activeLevel5Object.id
              nodes = nodes.concat(
                level6Object({
                  treeData,
                  taxonomyName,
                  activeLevel3ObjectName,
                  activeLevel3ObjectId,
                  activeLevel4ObjectName,
                  activeLevel4ObjectId,
                  activeLevel5ObjectName,
                  activeLevel5ObjectId,
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
                  level7Object({
                    treeData,
                    taxonomyName,
                    activeLevel3ObjectName,
                    activeLevel3ObjectId,
                    activeLevel4ObjectName,
                    activeLevel4ObjectId,
                    activeLevel5ObjectName,
                    activeLevel5ObjectId,
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
                    level8Object({
                      treeData,
                      taxonomyName,
                      activeLevel3ObjectName,
                      activeLevel3ObjectId,
                      activeLevel4ObjectName,
                      activeLevel4ObjectId,
                      activeLevel5ObjectName,
                      activeLevel5ObjectId,
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
                      level9Object({
                        treeData,
                        taxonomyName,
                        activeLevel3ObjectName,
                        activeLevel3ObjectId,
                        activeLevel4ObjectName,
                        activeLevel4ObjectId,
                        activeLevel5ObjectName,
                        activeLevel5ObjectId,
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
                        level10Object({
                          treeData,
                          taxonomyName,
                          activeLevel3ObjectName,
                          activeLevel3ObjectId,
                          activeLevel4ObjectName,
                          activeLevel4ObjectId,
                          activeLevel5ObjectName,
                          activeLevel5ObjectId,
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
