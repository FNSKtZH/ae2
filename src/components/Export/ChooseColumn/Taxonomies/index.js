// @flow
import React from 'react'
import styled from 'styled-components'
import Paper from 'material-ui/Paper'
import { FormGroup, FormControlLabel } from 'material-ui/Form'
import Checkbox from 'material-ui/Checkbox'
import { withApollo } from 'react-apollo'
import compose from 'recompose/compose'
import withHandlers from 'recompose/withHandlers'
import get from 'lodash/get'
import sortBy from 'lodash/sortBy'

import HowTo from './HowTo'

import exportTypeMutation from '../../exportTypeMutation'
import exportTypeData from '../../exportTypeData'
import exportTaxonomiesMutation from '../../exportTaxonomiesMutation'
import exportTaxonomiesData from '../../exportTaxonomiesData'
import propsByTaxData from '../propsByTaxData'
import taxonomiesData from './taxonomiesData'
import ErrorBoundary from '../../../shared/ErrorBoundary'

const exportTypes = ['Arten', 'Lebensräume']
const exportTypeTAXToReadable = {
  ART: 'Arten',
  LEBENSRAUM: 'Lebensräume',
}

const Container = styled.div`
  padding: 0 5px;
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
const StyledPaper = styled(Paper)`
  width: 100%;
  color: white;
  background-color: ${props => `${props['data-bgcolor']} !important`};
  margin-bottom: 10px;
  margin-top: 10px;
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
  exportTypeData,
  propsByTaxData,
  withHandlers({
    onCheckType: ({ client, taxonomiesData, exportTaxonomiesData }) => (
      event,
      isChecked
    ) => {
      const { name } = event.target
      const allTaxonomies = get(taxonomiesData, 'allTaxonomies.nodes', [])
      const taxonomiesOfType = allTaxonomies.filter(
        t => t.type.toLowerCase() === name.toLowerCase()
      )
      const exportTaxonomies = get(exportTaxonomiesData, 'exportTaxonomies', [])
      if (isChecked) {
        client.mutate({
          mutation: exportTypeMutation,
          variables: { value: name },
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
        // check if taxonomy(s) of other type was choosen
        // if so: uncheck
        const exportTaxonomiesWithoutOtherType = exportTaxonomies.filter(
          t => exportTypeTAXToReadable[t.type] === name
        )
        if (exportTaxonomiesWithoutOtherType.length < exportTaxonomies.length) {
          client.mutate({
            mutation: exportTaxonomiesMutation,
            variables: { value: exportTaxonomiesWithoutOtherType },
          })
        }
      } else {
        client.mutate({
          mutation: exportTypeMutation,
          variables: { value: exportTypes.find(t => t !== name) },
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
    onCheckTaxonomy: ({ client, exportTaxonomiesData, taxonomiesData }) => (
      event,
      isChecked
    ) => {
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
          const value = thisTaxonomy.type === 'ART' ? 'Arten' : 'Lebensräume'
          client.mutate({
            mutation: exportTypeMutation,
            variables: { value },
          })
        }
      }
    },
  })
)

const Types = ({
  taxonomiesData,
  propsByTaxData,
  exportTypeData,
  exportTaxonomiesData,
  onCheckType,
  onCheckTaxonomy,
}: {
  taxonomiesData: Object,
  propsByTaxData: Object,
  exportTypeData: Object,
  exportTaxonomiesData: Object,
  onCheckType: () => void,
  onCheckTaxonomy: () => void,
}) => {
  const exportType = get(exportTypeData, 'exportType', null)
  const exportTaxonomies = get(exportTaxonomiesData, 'exportTaxonomies', [])
  const allTaxonomies = sortBy(
    get(taxonomiesData, 'allTaxonomies.nodes', []),
    'name'
  )
  const { loading } = propsByTaxData
  let paperBackgroundColor = '#1565C0'
  let textProperties = 'Wählen Sie eine oder mehrere Taxonomien.'
  if (!exportType) {
    textProperties = 'Wählen Sie Arten oder Lebensräume.'
  }
  if (loading) {
    textProperties = 'Die Eigenschaften werden ergänzt...'
  }
  if (!loading && exportTaxonomies.length > 0) {
    paperBackgroundColor = '#2E7D32'
    textProperties = 'Die Eigenschaften wurden geladen.'
  }

  return (
    <ErrorBoundary>
      <Container>
        <HowTo />
        {exportTypes.map(type => (
          <TypeContainer key={type}>
            <TypeLabel
              control={
                <Checkbox
                  color="primary"
                  name={type}
                  checked={exportType === type}
                  onChange={onCheckType}
                />
              }
              label={type}
            />
            {exportType === type && (
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
                            color="primary"
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
        <StyledPaper elevation={1} data-bgcolor={paperBackgroundColor}>
          <PaperTextContainer>
            <PropertyTextDiv>{textProperties}</PropertyTextDiv>
          </PaperTextContainer>
        </StyledPaper>
      </Container>
    </ErrorBoundary>
  )
}

export default enhance(Types)
