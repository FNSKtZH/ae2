const treeDataVariables = ({ activeNodeArray }) => {
  const existsLevel1 = activeNodeArray.length > 0
  const existsLevel2Pc =
    existsLevel1 &&
    activeNodeArray[0] === 'Eigenschaften-Sammlungen' &&
    activeNodeArray.length > 0
  const existsLevel2Taxonomy =
    activeNodeArray.length > 1 &&
    activeNodeArray[1] !== 0 && // dont know why but this happens
    ['Arten', 'Lebensräume'].includes(activeNodeArray[0])
  const level2Taxonomy = existsLevel2Taxonomy
    ? activeNodeArray[1]
    : '99999999-9999-9999-9999-999999999999'
  const existsLevel3Object =
    activeNodeArray.length > 2 &&
    ['Arten', 'Lebensräume'].includes(activeNodeArray[0])
  const existsLevel4Object = activeNodeArray.length > 3
  const existsLevel5Object = activeNodeArray.length > 4
  const existsLevel6Object = activeNodeArray.length > 5
  const existsLevel7Object = activeNodeArray.length > 6
  const existsLevel8Object = activeNodeArray.length > 7
  const existsLevel9Object = activeNodeArray.length > 8
  let pCId = '99999999-9999-9999-9999-999999999999'
  if (activeNodeArray[0] === 'Eigenschaften-Sammlungen' && activeNodeArray[1]) {
    pCId = activeNodeArray[1]
  }
  const existsPCId = pCId !== '99999999-9999-9999-9999-999999999999'

  return {
    existsLevel2Pc,
    existsLevel2Taxonomy,
    level2Taxonomy,
    existsLevel3Object,
    existsLevel4Object,
    existsLevel5Object,
    existsLevel6Object,
    existsLevel7Object,
    existsLevel8Object,
    existsLevel9Object,
    pCId,
    existsPCId,
  }
}

export default treeDataVariables
