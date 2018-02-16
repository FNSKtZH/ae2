// @flow
export default ({ activeNodeArray }: { activeNodeArray: Array<string> }) => {
  const existsLevel1 = activeNodeArray.length > 0
  const existsLevel2Pc =
    existsLevel1 &&
    activeNodeArray[0] === 'Eigenschaften-Sammlungen' &&
    activeNodeArray.length > 0
  const existsLevel2Taxonomy =
    activeNodeArray.length > 1 &&
    ['Arten', 'Lebensräume'].includes(activeNodeArray[0])
  const level2Taxonomy = existsLevel2Taxonomy
    ? activeNodeArray[1]
    : '99999999-9999-9999-9999-999999999999'
  const level2TaxonomyPossibleNull = activeNodeArray[1] || null
  const existsLevel3Object =
    activeNodeArray.length > 2 &&
    ['Arten', 'Lebensräume'].includes(activeNodeArray[0])
  const level3Object = existsLevel3Object
    ? activeNodeArray[2]
    : '99999999-9999-9999-9999-999999999999'
  const existsLevel4Object = activeNodeArray.length > 3
  const level4Object = existsLevel4Object
    ? activeNodeArray[3]
    : '99999999-9999-9999-9999-999999999999'
  const existsLevel5Object = activeNodeArray.length > 4
  const level5Object = existsLevel5Object
    ? activeNodeArray[4]
    : '99999999-9999-9999-9999-999999999999'
  const existsLevel6Object = activeNodeArray.length > 5
  const level6Object = existsLevel6Object
    ? activeNodeArray[5]
    : '99999999-9999-9999-9999-999999999999'
  const existsLevel7Object = activeNodeArray.length > 6
  const level7Object = existsLevel7Object
    ? activeNodeArray[6]
    : '99999999-9999-9999-9999-999999999999'
  const existsLevel8Object = activeNodeArray.length > 7
  const level8Object = existsLevel8Object
    ? activeNodeArray[7]
    : '99999999-9999-9999-9999-999999999999'
  const existsLevel9Object = activeNodeArray.length > 8
  const level9Object = existsLevel9Object
    ? activeNodeArray[8]
    : '99999999-9999-9999-9999-999999999999'
  let pCId = '99999999-9999-9999-9999-999999999999'
  if (activeNodeArray[0] === 'Eigenschaften-Sammlungen' && activeNodeArray[1]) {
    pCId = activeNodeArray[1]
  }
  const existsPCId = pCId !== '99999999-9999-9999-9999-999999999999'

  return {
    existsLevel2Pc,
    existsLevel2Taxonomy,
    level2Taxonomy,
    level2TaxonomyPossibleNull,
    existsLevel3Object,
    level3Object,
    existsLevel4Object,
    level4Object,
    existsLevel5Object,
    level5Object,
    existsLevel6Object,
    level6Object,
    existsLevel7Object,
    level7Object,
    existsLevel8Object,
    level8Object,
    existsLevel9Object,
    level9Object,
    pCId,
    existsPCId,
  }
}
