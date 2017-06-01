// @flow
export default (store: Object, props: Object): Array<Object> => {
  console.log('taxonomyLevel1: props:', props)
  if (!props) return []

  // find taxonomy
  const taxonomy = props.allDataTypes.nodes.find(n => n.name === 'taxonomy')
  if (!taxonomy) return []
  if (!taxonomy.categoriesByDataType) return []
  if (!taxonomy.categoriesByDataType.nodes) return []

  return taxonomy.categoriesByDataType.nodes.map((n, index) => ({
    id: n.id,
    url: [taxonomy.name, n.id],
    label: n.name,
    childrenCount: n.totalCount,
  }))
}
