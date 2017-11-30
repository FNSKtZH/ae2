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
import exportTaxonomiesMutation from '../../../modules/exportTaxonomiesMutation'
import exportTaxonomiesData from '../../../modules/exportTaxonomiesData'
import propsByTaxData from '../../../modules/propsByTaxData'
import allCategoriesData from '../../../modules/allCategoriesData'
import taxonomiesOfCategoriesData from '../../../modules/taxonomiesOfCategoriesData'

const Container = styled.div`
  padding: 5px 10px;
  height: calc(100% - 48px);
  overflow: auto !important;
`
const CategoryContainer = styled.div``
const TaxContainer = styled.div`
  margin-left: 39px;
  margin-bottom: 10px;
  margin-top: 3px;
`
const TaxTitle = styled.div``
const CategoryCheckbox = styled(Checkbox)``
const categoryCheckboxLabelStyle = {
  fontWeight: 500,
}
const TaxonomyCheckbox = styled(Checkbox)``
const PaperTextContainer = styled.div`
  padding: 16px;
`
const PropertyTextDiv = styled.div`
  padding-bottom: 5px;
`

const exportCategoriesData = graphql(exportCategoriesGql, {
  name: 'exportCategoriesData',
})

const enhance = compose(
  withApollo,
  exportTaxonomiesData,
  exportCategoriesData,
  propsByTaxData,
  allCategoriesData,
  taxonomiesOfCategoriesData,
  withHandlers({
    onCheckCategory: ({ client, exportCategoriesData }) => (
      event,
      isChecked
    ) => {
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
    onCheckTaxonomy: ({ client, exportTaxonomiesData }) => (
      event,
      isChecked
    ) => {
      const exportTaxonomies = get(exportTaxonomiesData, 'exportTaxonomies', [])
      const { name } = event.target
      const taxonomies = isChecked
        ? [...exportTaxonomies, name]
        : exportTaxonomies.filter(c => c !== name)
      client.mutate({
        mutation: exportTaxonomiesMutation,
        variables: { value: taxonomies },
      })
    },
  })
)

const Categories = ({
  data,
  taxonomiesOfCategoriesData,
  exportCategoriesData,
  exportTaxonomiesData,
  allCategoriesData,
  onCheckCategory,
  onCheckTaxonomy,
}: {
  data: Object,
  taxonomiesOfCategoriesData: Array<Object>,
  exportCategoriesData: Object,
  exportTaxonomiesData: Object,
  allCategoriesData: Object,
  onCheckCategory: () => void,
  onCheckTaxonomy: () => void,
}) => {
  const exportCategories = get(exportCategoriesData, 'exportCategories', [])
  const exportTaxonomies = get(exportTaxonomiesData, 'exportTaxonomies', [])
  const taxonomiesOfCategories = get(
    taxonomiesOfCategoriesData,
    'taxonomiesOfCategoriesFunction.nodes',
    []
  )
  const categories = get(allCategoriesData, 'allCategories.nodes', []).map(
    c => c.name
  )
  const { loading } = data
  let paperBackgroundColor = '#1565C0'
  let textProperties = 'Wählen Sie eine oder mehrere Gruppen.'
  if (exportCategories.length > 0) {
    textProperties = 'Wählen Sie eine oder mehrere Taxonomien.'
  }
  if (loading) {
    textProperties = 'Die Eigenschaften werden ergänzt...'
  }
  if (!loading && exportTaxonomies.length > 0) {
    paperBackgroundColor = '#2E7D32'
    textProperties = 'Die Eigenschaften wurden geladen.'
  }
  const paperStyle = {
    width: '100%',
    color: 'white',
    backgroundColor: paperBackgroundColor,
    marginBottom: '10px',
    marginTop: '10px',
  }

  return (
    <Container>
      <HowTo />
      {categories.map(category => (
        <CategoryContainer key={category}>
          <CategoryCheckbox
            name={category}
            label={category}
            checked={exportCategories.includes(category)}
            onCheck={onCheckCategory}
            labelStyle={categoryCheckboxLabelStyle}
          />
          {exportCategories.includes(category) && (
            <TaxContainer>
              <TaxTitle>
                {taxonomiesOfCategories.filter(t => t.categoryName === category)
                  .length === 1
                  ? 'Taxonomie:'
                  : 'Taxonomien:'}
              </TaxTitle>
              {taxonomiesOfCategories
                .filter(t => t.categoryName === category)
                .map(tax => (
                  <TaxonomyCheckbox
                    key={tax.taxonomyName}
                    name={tax.taxonomyName}
                    label={tax.taxonomyName}
                    checked={exportTaxonomies.includes(tax.taxonomyName)}
                    onCheck={onCheckTaxonomy}
                  />
                ))}
            </TaxContainer>
          )}
        </CategoryContainer>
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
