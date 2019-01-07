// @flow
import React from 'react'
import styled from 'styled-components'
import Paper from '@material-ui/core/Paper'
import compose from 'recompose/compose'
import get from 'lodash/get'

import HowTo from './HowTo'
import ExportTypes from './ExportTypes'

import withExportTypeData from '../../withExportTypeData'
import withExportTaxonomiesData from '../../withExportTaxonomiesData'
import withPropsByTaxData from '../withPropsByTaxData'
import ErrorBoundary from '../../../shared/ErrorBoundary'

const Container = styled.div`
  padding: 0 5px;
  overflow: auto !important;
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

const enhance = compose(
  withExportTaxonomiesData,
  withExportTypeData,
  withPropsByTaxData,
)

const Taxonomies = ({
  propsByTaxData,
  exportTypeData,
  exportTaxonomiesData,
}: {
  propsByTaxData: Object,
  exportTypeData: Object,
  exportTaxonomiesData: Object,
}) => {
  const exportTaxonomies = get(exportTaxonomiesData, 'exportTaxonomies', [])

  const exportType = get(exportTypeData, 'exportType', null)
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
        <ExportTypes />
        <StyledPaper elevation={1} data-bgcolor={paperBackgroundColor}>
          <PaperTextContainer>
            <PropertyTextDiv>{textProperties}</PropertyTextDiv>
          </PaperTextContainer>
        </StyledPaper>
      </Container>
    </ErrorBoundary>
  )
}

export default enhance(Taxonomies)
