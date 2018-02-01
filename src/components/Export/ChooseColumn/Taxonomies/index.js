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
import sortBy from 'lodash/sortBy'

import HowTo from './HowTo'

import exportTypesMutation from '../../exportTypesMutation'
import exportTypesData from '../../exportTypesData'
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
const TypeContainer = styled.div``
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
const TypeLabel = styled(FormControlLabel)`
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
  exportTypesData,
  propsByTaxData,
  withHandlers({
    onCheckType: ({
      client,
      taxonomiesData,
      exportTypesData,
      exportTaxonomiesData,
    }) => (event, isChecked) => {
      const exportTypes = get(exportTypesData, 'exportTypes', [])
      const { name } = event.target
      const allTaxonomies = get(taxonomiesData, 'allTaxonomies.nodes', [])
      const taxonomiesOfType = allTaxonomies.filter(
        t => t.type.toLowerCase() === name.toLowerCase()
      )
      const exportTaxonomies = get(exportTaxonomiesData, 'exportTaxonomies', [])
      let types
      if (isChecked) {
        types = [...exportTypes, name]
        client.mutate({
          mutation: exportTypesMutation,
          variables: { value: types },
        })
        // check if only one Taxonomy exists
        // if so, check it
        if (taxonomiesOfType.length === 1) {
          const taxonomyName = taxonomiesOfType[0].taxonomyName
          const taxonomies = [...exportTaxonomies, taxonomyName]
          client.mutate({
            mutation: exportTaxonomiesMutation,
            variables: { value: taxonomies },
          })
        }
      } else {
        types = exportTypes.filter(c => c !== name)
        client.mutate({
          mutation: exportTypesMutation,
          variables: { value: types },
        })
        // uncheck all taxonomies of this type
        const taxonomiesToUncheck = taxonomiesOfType.map(t => t.taxonomyName)
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
      exportTypesData,
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
        // check if sole type is left
        // and this was only taxonomy
        // if so: uncheck type too
        const thisTaxonomy = allTaxonomies.find(t => t.name === name)
        if (taxonomies.length === 0) {
          // this was the only taxonomy in this type
          // it makes sense to also uncheck the type
          const { exportTypes } = exportTypesData
          const types = exportTypes.filter(c => {
            if (c === 'Arten') return thisTaxonomy.type !== 'ART'
            return thisTaxonomy.type !== 'LEBENSRAUM'
          })
          client.mutate({
            mutation: exportTypesMutation,
            variables: { value: types },
          })
        }
      }
    },
  })
)

const Types = ({
  taxonomiesData,
  propsByTaxData,
  exportTypesData,
  exportTaxonomiesData,
  onCheckType,
  onCheckTaxonomy,
}: {
  taxonomiesData: Object,
  propsByTaxData: Object,
  exportTypesData: Object,
  exportTaxonomiesData: Object,
  onCheckType: () => void,
  onCheckTaxonomy: () => void,
}) => {
  const exportTypes = get(exportTypesData, 'exportTypes', [])
  const exportTaxonomies = get(exportTaxonomiesData, 'exportTaxonomies', [])
  const allTaxonomies = sortBy(
    get(taxonomiesData, 'allTaxonomies.nodes', []),
    'name'
  )
  const types = ['Arten', 'Lebensräume']
  const { loading } = propsByTaxData
  let paperBackgroundColor = '#1565C0'
  let textProperties = 'Wählen Sie eine oder mehrere Gruppen.'
  if (exportTypes.length > 0) {
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
        {types.map(type => (
          <TypeContainer key={type}>
            <TypeLabel
              control={
                <Checkbox
                  name={type}
                  checked={exportTypes.includes(type)}
                  onChange={onCheckType}
                />
              }
              label={type}
            />
            {exportTypes.includes(type) && (
              <TaxContainer>
                <TaxTitle>
                  {allTaxonomies.filter(t => {
                    if (type === 'Arten') return t.type === 'ART'
                    return t.type === 'LEBENSRAUM'
                  }).length === 1
                    ? 'Taxonomie:'
                    : 'Taxonomien:'}
                </TaxTitle>
                <FormGroup>
                  {allTaxonomies
                    .filter(t => {
                      if (type === 'Arten') return t.type === 'ART'
                      return t.type === 'LEBENSRAUM'
                    })
                    .sort(t => t.name)
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
          </TypeContainer>
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

export default enhance(Types)
