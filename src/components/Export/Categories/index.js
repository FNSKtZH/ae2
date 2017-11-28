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
import CombineTaxonomies from './CombineTaxonomies'

import exportCategoriesMutation from '../../../modules/exportCategoriesMutation'
import exportCategoriesGql from '../../../modules/exportCategoriesGql'
import exportCombineTaxonomiesGql from '../../../modules/exportCombineTaxonomiesGql'

const exportCategoriesData = graphql(exportCategoriesGql, {
  name: 'exportCategoriesData',
})
const exportCombineTaxonomiesData = graphql(exportCombineTaxonomiesGql, {
  name: 'exportCombineTaxonomiesData',
})

const enhance = compose(
  withApollo,
  exportCategoriesData,
  exportCombineTaxonomiesData,
  withHandlers({
    onCheck: ({ client, exportCategoriesData }) => (event, isChecked) => {
      const { exportCategories } = exportCategoriesData
      const { name } = event.target
      const categories = isChecked
        ? [...exportCategories, name]
        : exportCategories.filter(c => c !== name)
      console.log('Export: will run exportCategoriesMutation')
      client.mutate({
        mutation: exportCategoriesMutation,
        variables: { value: categories },
      })
      console.log('Export: exportCategoriesMutation done')
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
const CombineTextDiv = styled.div`
  padding-top: 5px;
`

const Categories = ({
  data,
  exportCategoriesData,
  exportCombineTaxonomiesData,
  onCheck,
}: {
  data: Object,
  exportCategoriesData: Object,
  exportCombineTaxonomiesData: Object,
  onCheck: () => void,
}) => {
  const { exportCombineTaxonomies } = exportCombineTaxonomiesData
  const exportCategories = exportCategoriesData.exportCategories || []
  const { loading } = data
  const categories = get(data, 'allCategories.nodes', []).map(c => c.name)
  let paperBackgroundColor = '#90CAF9'
  let textProperties = 'Bitte wählen Sie eine oder mehrere Gruppen.'
  let textCombine = exportCombineTaxonomies
    ? 'Taxonomien werden zusammengefasst.'
    : 'Taxonomien werden einzeln dargestellt.'
  if (loading) {
    textProperties = 'Die Eigenschaften werden ergänzt...'
  }
  if (!loading && exportCategories.length > 0) {
    paperBackgroundColor = '#A5D6A7'
    textProperties = 'Die Eigenschaften wurden geladen.'
  }
  const paperStyle = {
    width: '100%',
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
      <CombineTaxonomies />
      <Paper style={paperStyle} zDepth={1}>
        <PaperTextContainer>
          <PropertyTextDiv>{textProperties}</PropertyTextDiv>
          {exportCategories.length > 0 && (
            <CombineTextDiv>{textCombine}</CombineTextDiv>
          )}
        </PaperTextContainer>
      </Paper>
    </Container>
  )
}

export default enhance(Categories)
