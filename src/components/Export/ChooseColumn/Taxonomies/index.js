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
import propsByTaxData from '../propsByTaxData'
import taxonomiesData from './taxonomiesData'
import ErrorBoundary from '../../../shared/ErrorBoundary'

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
  taxonomiesData,
  exportTaxonomiesData,
  exportCategoriesData,
  propsByTaxData,
  withHandlers({
    onCheckCategory: ({
      client,
      taxonomiesData,
      exportCategoriesData,
      exportTaxonomiesData,
    }) => (event, isChecked) => {
      const exportCategories = get(exportCategoriesData, 'exportCategories', [])
      const { name } = event.target
      const allTaxonomies = get(taxonomiesData, 'allTaxonomies.nodes', [])
      const taxonomiesOfCategory = allTaxonomies.filter(
        t => t.type.toLowerCase() === name.toLowerCase()
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
      taxonomiesData,
      exportCategoriesData,
    }) => (event, isChecked) => {
      const allTaxonomies = get(taxonomiesData, 'allTaxonomies.nodes', [])
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
        const thisTaxonomy = allTaxonomies.find(t => t.name === name)
        if (taxonomies.length === 0) {
          // this was the only taxonomy in this category
          // it makes sense to also uncheck the category
          const { exportCategories } = exportCategoriesData
          const categories = exportCategories.filter(c => {
            if (c === 'Arten') return thisTaxonomy.type !== 'ART'
            return thisTaxonomy.type !== 'LEBENSRAUM'
          })
          client.mutate({
            mutation: exportCategoriesMutation,
            variables: { value: categories },
          })
        }
      }
    },
  })
)

const Categories = ({
  taxonomiesData,
  propsByTaxData,
  exportCategoriesData,
  exportTaxonomiesData,
  onCheckCategory,
  onCheckTaxonomy,
}: {
  taxonomiesData: Object,
  propsByTaxData: Object,
  exportCategoriesData: Object,
  exportTaxonomiesData: Object,
  onCheckCategory: () => void,
  onCheckTaxonomy: () => void,
}) => {
  const exportCategories = get(exportCategoriesData, 'exportCategories', [])
  const exportTaxonomies = get(exportTaxonomiesData, 'exportTaxonomies', [])
  const allTaxonomies = get(taxonomiesData, 'allTaxonomies.nodes', [])
  const categories = ['Arten', 'Lebensräume']
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
    <ErrorBoundary>
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
                />
              }
              label={category}
            />
            {exportCategories.includes(category) && (
              <TaxContainer>
                <TaxTitle>
                  {allTaxonomies.filter(t => {
                    if (category === 'Arten') return t.type === 'ART'
                    return t.type === 'LEBENSRAUM'
                  }).length === 1
                    ? 'Taxonomie:'
                    : 'Taxonomien:'}
                </TaxTitle>
                <FormGroup>
                  {allTaxonomies
                    .filter(t => {
                      if (category === 'Arten') return t.type === 'ART'
                      return t.type === 'LEBENSRAUM'
                    })
                    .map(tax => (
                      <TaxonomyLabel
                        key={tax.name}
                        control={
                          <Checkbox
                            name={tax.name}
                            checked={exportTaxonomies.includes(tax.name)}
                            onChange={onCheckTaxonomy}
                          />
                        }
                        label={tax.name}
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
    </ErrorBoundary>
  )
}

export default enhance(Categories)
