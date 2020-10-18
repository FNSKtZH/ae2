import React, { useContext } from 'react'
import styled from 'styled-components'
import Paper from '@material-ui/core/Paper'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { observer } from 'mobx-react-lite'

import HowTo from './HowTo'
import ExportTypes from './ExportTypes'
import mobxStoreContext from '../../../../mobxStoreContext'
import ErrorBoundary from '../../../shared/ErrorBoundary'

const Container = styled.div`
  padding: 0 5px;
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
  background-color: ${(props) => `${props['data-bgcolor']} !important`};
  margin-bottom: 10px;
  margin-top: 10px;
`

const propsByTaxQuery = gql`
  query propsByTaxDataQuery(
    $queryExportTaxonomies: Boolean!
    $exportTaxonomies: [String]
  ) {
    pcoPropertiesByTaxonomiesFunction(taxonomyNames: $exportTaxonomies)
      @include(if: $queryExportTaxonomies) {
      nodes {
        propertyCollectionName
        propertyName
        jsontype
        count
      }
    }
    rcoPropertiesByTaxonomiesFunction(taxonomyNames: $exportTaxonomies)
      @include(if: $queryExportTaxonomies) {
      nodes {
        propertyCollectionName
        relationType
        propertyName
        jsontype
        count
      }
    }
    taxPropertiesByTaxonomiesFunction(taxonomyNames: $exportTaxonomies)
      @include(if: $queryExportTaxonomies) {
      nodes {
        taxonomyName
        propertyName
        jsontype
        count
      }
    }
  }
`

const Taxonomies = () => {
  const mobxStore = useContext(mobxStoreContext)
  const { type: exportType } = mobxStore.export
  const exportTaxonomies = mobxStore.export.taxonomies.toJSON()

  const { loading: propsByTaxLoading, error: propsByTaxError } = useQuery(
    propsByTaxQuery,
    {
      variables: {
        exportTaxonomies,
        queryExportTaxonomies: exportTaxonomies.length > 0,
      },
    },
  )

  let paperBackgroundColor = '#1565C0'
  let textProperties = 'Wählen Sie eine oder mehrere Taxonomien.'
  if (!exportType) {
    textProperties = 'Wählen Sie Arten oder Lebensräume.'
  }
  if (propsByTaxLoading) {
    textProperties = 'Die Eigenschaften werden ergänzt...'
  }
  if (!propsByTaxLoading && exportTaxonomies.length > 0) {
    paperBackgroundColor = '#2E7D32'
    textProperties = 'Die Eigenschaften wurden geladen.'
  }

  if (propsByTaxError) return `Error fetching data: ${propsByTaxError.message}`

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

export default observer(Taxonomies)
