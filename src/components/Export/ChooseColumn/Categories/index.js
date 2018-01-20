// @flow
import React from 'react'
import styled from 'styled-components'
import Paper from 'material-ui/Paper'
import { FormGroup, FormControlLabel } from 'material-ui-next/Form'
import Checkbox from 'material-ui-next/Checkbox'
import { withApollo } from 'react-apollo'
import compose from 'recompose/compose'
import withHandlers from 'recompose/withHandlers'
import get from 'lodash/get'

import HowTo from './HowTo'

import exportCategoriesMutation from '../../exportCategoriesMutation'
import exportCategoriesData from '../../exportCategoriesData'
import exportTaxonomiesMutation from '../../exportTaxonomiesMutation'
import exportTaxonomiesData from '../../exportTaxonomiesData'
import propsByTaxData from '../../../../modules/propsByTaxData'
import allCategoriesData from '../../../../modules/allCategoriesData'
import taxonomiesOfCategoriesData from '../../../../modules/taxonomiesOfCategoriesData'

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
const TaxTitle = styled.div`
  margin-left: -5px;
`
const PaperTextContainer = styled.div`
  padding: 16px;
`
const PropertyTextDiv = styled.div`
  padding-bottom: 5px;
`
const CategoryLabel = styled(FormControlLabel)`
  height: 30px;
  min-height: 30px;
  > span {
    font-weight: 500;
    line-height: 1em;
  }
`
const TaxonomyLabel = styled(FormControlLabel)`
  height: 33px;
  min-height: 33px;
  margin-left: -20px !important;
  > span {
    font-weight: 500;
    line-height: 1em;
  }
`

const enhance = compose(
  withApollo,
  exportTaxonomiesData,
  exportCategoriesData,
  propsByTaxData,
  allCategoriesData,
  taxonomiesOfCategoriesData,
  withHandlers({
    onCheckCategory: ({
      client,
      exportCategoriesData,
      exportTaxonomiesData,
      taxonomiesOfCategoriesData,
    }) => (event, isChecked) => {
      const { exportCategories } = exportCategoriesData
      const { name } = event.target
      const taxonomiesOfCategories = get(
        taxonomiesOfCategoriesData,
        'taxonomiesOfCategoriesFunction.nodes',
        []
      )
      const taxonomiesOfCategory = taxonomiesOfCategories.filter(
        t => t.categoryName === name
      )
      const exportTaxonomies = get(exportTaxonomiesData, 'exportTaxonomies', [])
      let categories
      if (isChecked) {
        categories = [...exportCategories, name]
        client.mutate({
          mutation: exportCategoriesMutation,
          variables: { value: categories },
        })
        // check if only one Taxonomy exists
        // if so, check it
        if (taxonomiesOfCategory.length === 1) {
          const taxonomyName = taxonomiesOfCategory[0].taxonomyName
          const taxonomies = [...exportTaxonomies, taxonomyName]
          client.mutate({
            mutation: exportTaxonomiesMutation,
            variables: { value: taxonomies },
          })
        }
      } else {
        categories = exportCategories.filter(c => c !== name)
        client.mutate({
          mutation: exportCategoriesMutation,
          variables: { value: categories },
        })
        // uncheck all taxonomies of this category
        const taxonomiesToUncheck = taxonomiesOfCategory.map(
          t => t.taxonomyName
        )
        const remainingTaxonomies = exportTaxonomies.filter(
          t => !taxonomiesToUncheck.includes(t)
        )
        client.mutate({
          mutation: exportTaxonomiesMutation,
          variables: { value: remainingTaxonomies },
        })
      }
    },
    onCheckTaxonomy: ({
      client,
      exportTaxonomiesData,
      taxonomiesOfCategoriesData,
      exportCategoriesData,
    }) => (event, isChecked) => {
      const exportTaxonomies = get(exportTaxonomiesData, 'exportTaxonomies', [])
      const { name } = event.target
      let taxonomies
      if (isChecked) {
        taxonomies = [...exportTaxonomies, name]
        client.mutate({
          mutation: exportTaxonomiesMutation,
          variables: { value: taxonomies },
        })
      } else {
        taxonomies = exportTaxonomies.filter(c => c !== name)
        client.mutate({
          mutation: exportTaxonomiesMutation,
          variables: { value: taxonomies },
        })
        // check if sole category is left
        // and this was only taxonomy
        // if so: uncheck category too
        const taxonomiesOfCategories = get(
          taxonomiesOfCategoriesData,
          'taxonomiesOfCategoriesFunction.nodes',
          []
        )
        const taxonomiesOfCategory = taxonomiesOfCategories.filter(
          t => t.taxonomyName === name
        )
        if (taxonomies.length === 0) {
          const categoryName = taxonomiesOfCategory[0].categoryName
          const taxonomiesOfThisCategory = taxonomiesOfCategories.filter(
            t => t.categoryName === categoryName
          )
          if (taxonomiesOfThisCategory.length === 1) {
            // this was the only taxonomy in this category
            // it makes sense to also uncheck the category
            const { exportCategories } = exportCategoriesData
            const categories = exportCategories.filter(c => c !== categoryName)
            client.mutate({
              mutation: exportCategoriesMutation,
              variables: { value: categories },
            })
          }
        }
      }
    },
  })
)

const Categories = ({
  propsByTaxData,
  taxonomiesOfCategoriesData,
  exportCategoriesData,
  exportTaxonomiesData,
  allCategoriesData,
  onCheckCategory,
  onCheckTaxonomy,
}: {
  propsByTaxData: Object,
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
  const { loading } = propsByTaxData
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
          <CategoryLabel
            control={
              <Checkbox
                name={category}
                checked={exportCategories.includes(category)}
                onChange={onCheckCategory}
                value={category}
              />
            }
            label={category}
          />
          {exportCategories.includes(category) && (
            <TaxContainer>
              <TaxTitle>
                {taxonomiesOfCategories.filter(t => t.categoryName === category)
                  .length === 1
                  ? 'Taxonomie:'
                  : 'Taxonomien:'}
              </TaxTitle>
              <FormGroup>
                {taxonomiesOfCategories
                  .filter(t => t.categoryName === category)
                  .map(tax => (
                    <TaxonomyLabel
                      key={tax.taxonomyName}
                      control={
                        <Checkbox
                          name={tax.taxonomyName}
                          checked={exportTaxonomies.includes(tax.taxonomyName)}
                          onChange={onCheckTaxonomy}
                          value={tax.taxonomyName}
                        />
                      }
                      label={tax.taxonomyName}
                    />
                  ))}
              </FormGroup>
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
