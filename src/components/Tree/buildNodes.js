/**
 * gets data from AppQuery
 * returns nodes
 */
import buildLevel1Nodes from './nodes/level1'
import buildLevel2BenutzerNodes from './nodes/level2Benutzer'
import buildLevel2OrganizationNodes from './nodes/level2Organization'
import buildLevel2PcNodes from './nodes/level2Pc'
import buildLevel3PcNodes from './nodes/level3Pc'
import buildLevel2TaxonomyNodes from './nodes/level2Taxonomy'
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
  console.log('building level 1 roots')
  let nodes = buildLevel1Nodes({
    treeData,
    activeNodeArray,
    treeDataLoading,
    mobxStore,
  })
  if (activeNodeArray.length > 0) {
    if (activeNodeArray[0] === 'Eigenschaften-Sammlungen') {
      nodes = [...nodes, ...buildLevel2PcNodes({ treeData })]
      if (activeNodeArray.length > 1) {
        nodes = nodes.concat(
          buildLevel3PcNodes({
            treeData,
          }),
        )
      }
    } else if (activeNodeArray[0] === 'Benutzer' && !!mobxStore.login.token) {
      nodes = [...nodes, ...buildLevel2BenutzerNodes({ treeData })]
    } else if (activeNodeArray[0] === 'Organisationen') {
      nodes = [
        ...nodes,
        ...buildLevel2OrganizationNodes({ treeData, mobxStore }),
      ]
    } else if (['Arten', 'Lebensräume'].includes(activeNodeArray[0])) {
      console.log('building level 2 taxonomies')
      const type = activeNodeArray[0]
      const taxonomies =
        type === 'Arten'
          ? treeData?.artTaxonomies?.nodes ?? []
          : treeData?.lrTaxonomies?.nodes ?? []
      const taxonomySort = type === 'Arten' ? 1 : 2
      nodes = [
        ...nodes,
        ...buildLevel2TaxonomyNodes({ type, taxonomies, taxonomySort }),
      ]
      if (activeNodeArray.length > 1) {
        const taxonomy = taxonomies.find((n) => n.id === activeNodeArray[1])
        const level3Objects = treeData?.level3Object?.nodes ?? []
        nodes = nodes.concat(
          buildLevel3Objects({
            type,
            treeData,
            taxonomy,
            taxonomySort,
            level3Objects,
          }),
        )
        console.log('building level 3 objects', {
          nodes,
          type,
          treeData,
          taxonomy,
          level3Objects,
        })
        if (activeNodeArray.length > 2) {
          console.log('building level 4 objects')
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
          console.log('building level 4 objects', {
            activeNodeArray,
            nodes,
            activeNodeArray3: activeNodeArray[3],
          })
          if (activeNodeArray.length > 3) {
            console.log('building level 5 objects')
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
              console.log('building level 6 objects')
              const level5Object = level5Objects.find(
                (n) => n.id === activeNodeArray[4],
              )
              const level6Objects =
                treeData?.level6Object?.objectsByParentId?.nodes ?? []
              nodes = nodes.concat(
                buildLevel6Objects({
                  type,
                  treeData,
                  taxonomy,
                  taxonomySort,
                  level3Object,
                  level4Object,
                  level5Object,
                  level6Objects,
                }),
              )
              if (activeNodeArray.length > 5) {
                const level6Object = level6Objects.find(
                  (n) => n.id === activeNodeArray[5],
                )
                const level7Objects =
                  treeData?.level7Object?.objectsByParentId?.nodes ?? []
                nodes = nodes.concat(
                  buildLevel7Objects({
                    type,
                    treeData,
                    taxonomy,
                    taxonomySort,
                    level3Object,
                    level4Object,
                    level5Object,
                    level6Object,
                    level7Objects,
                  }),
                )
                if (activeNodeArray.length > 6) {
                  const level7Object = level7Objects.find(
                    (n) => n.id === activeNodeArray[6],
                  )
                  const level8Objects =
                    treeData?.level8Object?.objectsByParentId?.nodes ?? []
                  nodes = nodes.concat(
                    buildLevel8Objects({
                      type,
                      treeData,
                      taxonomy,
                      taxonomySort,
                      level3Object,
                      level4Object,
                      level5Object,
                      level6Object,
                      level7Object,
                      level8Objects,
                    }),
                  )
                  if (activeNodeArray.length > 7) {
                    const level8Object = level8Objects.find(
                      (n) => n.id === activeNodeArray[7],
                    )
                    const level9Objects =
                      treeData?.level9Object?.objectsByParentId?.nodes ?? []
                    nodes = nodes.concat(
                      buildLevel9Objects({
                        type,
                        treeData,
                        taxonomy,
                        taxonomySort,
                        level3Object,
                        level4Object,
                        level5Object,
                        level6Object,
                        level7Object,
                        level8Object,
                        level9Objects,
                      }),
                    )
                    if (activeNodeArray.length > 8) {
                      const level9Object = level9Objects.find(
                        (n) => n.id === activeNodeArray[8],
                      )
                      nodes = nodes.concat(
                        buildLevel10Objects({
                          type,
                          treeData,
                          taxonomy,
                          taxonomySort,
                          level3Object,
                          level4Object,
                          level5Object,
                          level6Object,
                          level7Object,
                          level8Object,
                          level9Object,
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
