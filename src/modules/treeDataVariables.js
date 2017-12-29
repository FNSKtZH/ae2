// @flow
export default ({ activeNodeArray }: { activeNodeArray: Array<string> }) => {
  const existsLevel1 = activeNodeArray.length > 0
  const existsLevel2Taxonomy =
    existsLevel1 &&
    activeNodeArray[0] === 'Taxonomien' &&
    activeNodeArray.length > 0
  const existsLevel2Pc =
    existsLevel1 &&
    activeNodeArray[0] === 'Eigenschaften-Sammlungen' &&
    activeNodeArray.length > 0
  const notExistsLevel2Pc = !existsLevel2Pc
  const existsLevel3 =
    activeNodeArray.length > 1 && activeNodeArray[0] === 'Taxonomien'
  const level3Taxonomy = existsLevel3 ? activeNodeArray[1] : 'none'
  const existsLevel4 =
    activeNodeArray.length > 2 && activeNodeArray[0] === 'Taxonomien'
  const level4Taxonomy = existsLevel4
    ? activeNodeArray[2]
    : '99999999-9999-9999-9999-999999999999'
  const level4TaxonomyPossibleNull = activeNodeArray[2] || null
  const existsLevel5 = activeNodeArray.length > 3
  const level5Taxonomy = existsLevel5
    ? activeNodeArray[3]
    : '99999999-9999-9999-9999-999999999999'
  const existsLevel6 = activeNodeArray.length > 4
  const level6Taxonomy = existsLevel6
    ? activeNodeArray[4]
    : '99999999-9999-9999-9999-999999999999'
  const existsLevel7 = activeNodeArray.length > 5
  const level7Taxonomy = existsLevel7
    ? activeNodeArray[5]
    : '99999999-9999-9999-9999-999999999999'
  const existsLevel8 = activeNodeArray.length > 6
  const level8Taxonomy = existsLevel8
    ? activeNodeArray[6]
    : '99999999-9999-9999-9999-999999999999'
  const existsLevel9 = activeNodeArray.length > 7
  const level9Taxonomy = existsLevel9
    ? activeNodeArray[7]
    : '99999999-9999-9999-9999-999999999999'
  const existsLevel10 = activeNodeArray.length > 8
  const level10Taxonomy = existsLevel10
    ? activeNodeArray[8]
    : '99999999-9999-9999-9999-999999999999'
  let pCId = '99999999-9999-9999-9999-999999999999'
  if (activeNodeArray[0] === 'Eigenschaften-Sammlungen' && activeNodeArray[1]) {
    pCId = activeNodeArray[1]
  }
  const existsPCId = pCId !== '99999999-9999-9999-9999-999999999999'

  return {
    existsLevel2Pc,
    notExistsLevel2Pc,
    existsLevel2Taxonomy,
    existsLevel3,
    level3Taxonomy,
    existsLevel4,
    level4Taxonomy,
    level4TaxonomyPossibleNull,
    existsLevel5,
    level5Taxonomy,
    existsLevel6,
    level6Taxonomy,
    existsLevel7,
    level7Taxonomy,
    existsLevel8,
    level8Taxonomy,
    existsLevel9,
    level9Taxonomy,
    existsLevel10,
    level10Taxonomy,
    pCId,
    existsPCId,
  }
}
