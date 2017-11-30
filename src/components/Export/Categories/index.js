// @flow
import React from 'react'
import styled from 'styled-components'
import Checkbox from 'material-ui/Checkbox'
import Paper from 'material-ui/Paper'
import { graphql, withApollo } from 'react-apollo'
import compose from 'recompose/compose'
import withHandlers from 'recompose/withHandlers'
import get from 'lodash/get'

import HowTo from './HowTo'

import exportCategoriesMutation from '../../../modules/exportCategoriesMutation'
import exportCategoriesGql from '../../../modules/exportCategoriesGql'

const exportCategoriesData = graphql(exportCategoriesGql, {
  name: 'exportCategoriesData',
})

const enhance = compose(
  withApollo,
  exportCategoriesData,
  withHandlers({
    onCheck: ({ client, exportCategoriesData }) => (event, isChecked) => {
      const { exportCategories } = exportCategoriesData
      const { name } = event.target
      const categories = isChecked
        ? [...exportCategories, name]
        : exportCategories.filter(c => c !== name)
      client.mutate({
        mutation: exportCategoriesMutation,
        variables: { value: categories },
      })
    },
  })
)

const Container = styled.div`
  padding: 5px 10px;
  height: calc(100% - 48px);
  overflow: auto !important;
`
const StyledCheckbox = styled(Checkbox)`
  margin-bottom: inherit;
`
const PaperTextContainer = styled.div`
  padding: 16px;
`
const PropertyTextDiv = styled.div`
  padding-bottom: 5px;
`

const Categories = ({
  data,
  exportCategoriesData,
  onCheck,
}: {
  data: Object,
  exportCategoriesData: Object,
  onCheck: () => void,
}) => {
  const taxOfCat = get(data, 'taxonomiesOfCategoriesFunction.nodes', [])
  console.log('Categories: taxOfCat:', taxOfCat)
  const exportCategories = exportCategoriesData.exportCategories || []
  const { loading } = data
  const categories = get(data, 'allCategories.nodes', []).map(c => c.name)
  let paperBackgroundColor = '#1565C0'
  let textProperties = 'Wählen Sie eine oder mehrere Gruppen.'
  if (loading) {
    textProperties = 'Die Eigenschaften werden ergänzt...'
  }
  if (!loading && exportCategories.length > 0) {
    paperBackgroundColor = '#2E7D32'
    textProperties = 'Die Eigenschaften wurden geladen.'
  }
  const paperStyle = {
    width: '100%',
    color: 'white',
    backgroundColor: paperBackgroundColor,
    marginBottom: '10px',
  }

  return (
    <Container>
      <HowTo />
      {categories.map(category => (
        <StyledCheckbox
          key={category}
          name={category}
          label={category}
          checked={exportCategories.includes(category)}
          onCheck={onCheck}
        />
      ))}
      <Paper style={paperStyle} zDepth={1}>
        <PaperTextContainer>
          <PropertyTextDiv>{textProperties}</PropertyTextDiv>
        </PaperTextContainer>
      </Paper>
    </Container>
  )
}

export default enhance(Categories)
