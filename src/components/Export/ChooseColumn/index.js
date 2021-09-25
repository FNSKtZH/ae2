import React, { useCallback, useState, useContext } from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import Icon from '@mui/material/Icon'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Snackbar from '@mui/material/Snackbar'
import styled from 'styled-components'
import { useQuery, gql } from '@apollo/client'
import { observer } from 'mobx-react-lite'
import SimpleBar from 'simplebar-react'
import { withResizeDetector } from 'react-resize-detector'

import Taxonomies from './Taxonomies'
import Properties from './Properties'
import Filter from './Filter'
import mobxStoreContext from '../../../mobxStoreContext'
import ErrorBoundary from '../../shared/ErrorBoundary'

const StyledSnackbar = styled(Snackbar)`
  div {
    min-width: auto;
    background-color: #2e7d32 !important;
  }
`
const StyledCard = styled(Card)`
  margin: 10px 0;
  background-color: rgb(255, 243, 224) !important;
`
const StyledCardActions = styled(CardActions)`
  justify-content: space-between;
  cursor: pointer;
  height: auto !important;
  background-color: #ffcc80;
`
const CardActionIconButton = styled(IconButton)`
  transform: ${(props) => (props['data-expanded'] ? 'rotate(180deg)' : 'none')};
`
const CardActionTitle = styled.div`
  padding-left: 8px;
  font-weight: bold;
  word-break: break-word;
`
const Container = styled.div`
  padding: 0 5px;
  overflow-x: hidden !important;
  height: 100%;
`
const ErrorContainer = styled.div`
  padding: 10px;
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
const exportObjectQuery = gql`
  query ChooseColumnExportObjectQuery(
    $exportTaxonomies: [String]!
    $taxFilters: [TaxFilterInput]!
    $fetchTaxProperties: Boolean!
  ) {
    exportObject(exportTaxonomies: $exportTaxonomies, taxFilters: $taxFilters) {
      totalCount
      nodes {
        id
        properties @include(if: $fetchTaxProperties)
      }
    }
  }
`
// turned off because of errors
/*
const exportRcoQuery = gql`
  query exportDataQuery(
    $rcoFilters: [RcoFilterInput]!
    $rcoProperties: [RcoPropertyInput]!
    $fetchRcoProperties: Boolean!
  ) {
    exportRco(rcoFilters: $rcoFilters, rcoProperties: $rcoProperties)
      @include(if: $fetchRcoProperties) {
      totalCount
      nodes {
        id
        propertyCollectionId
        objectId
        objectIdRelation
        objectByObjectIdRelation {
          id
          name
          taxonomyByTaxonomyId {
            id
            name
          }
        }
        propertyCollectionByPropertyCollectionId {
          id
          name
        }
        propertyCollectionOfOrigin
        relationType
        properties
      }
    }
  }
`*/
const synonymQuery = gql`
  query Query {
    allSynonyms {
      nodes {
        objectId
        objectIdSynonym
      }
    }
  }
`

const Export = ({ height }) => {
  const mobxStore = useContext(mobxStoreContext)
  const { taxProperties, taxFilters } = mobxStore.export
  const exportTaxonomies = mobxStore.export.taxonomies.toJSON()

  // need to remove __typename because apollo passes it along ?!
  const fetchTaxProperties = taxProperties.length > 0
  const { loading: propsByTaxLoading, error: propsByTaxError } = useQuery(
    propsByTaxQuery,
    {
      variables: {
        exportTaxonomies,
        queryExportTaxonomies: exportTaxonomies.length > 0,
      },
    },
  )
  const { loading: exportObjectLoading, error: exportObjectError } = useQuery(
    exportObjectQuery,
    {
      variables: {
        exportTaxonomies,
        taxFilters,
        fetchTaxProperties,
      },
    },
  )
  /*
  const rcoFilters = get(storeData, 'exportRcoFilters', []).map(d =>
    omit(d, ['__typename']),
  )
  const rcoProperties = get(storeData, 'exportRcoProperties', []).map(d =>
    omit(d, ['__typename']),
  )
  const fetchRcoProperties = rcoProperties.length > 0
  const { loading: exportRcoLoading, error: exportRcoError } = useQuery(
    exportRcoQuery,
    {
      variables: {
        rcoFilters,
        rcoProperties,
        fetchRcoProperties,
      },
    },
  )*/
  const { loading: synonymLoading } = useQuery(synonymQuery)

  const [taxonomiesExpanded, setTaxonomiesExpanded] = useState(true)
  const [filterExpanded, setFilterExpanded] = useState(false)
  const [propertiesExpanded, setPropertiesExpanded] = useState(false)
  const [message, setMessage] = useState('')

  const onSetMessage = useCallback((message) => {
    setMessage(message)
    if (!!message) {
      setTimeout(() => setMessage(''), 5000)
    }
  }, [])
  const onToggleTaxonomies = useCallback(() => {
    setTaxonomiesExpanded(!taxonomiesExpanded)
    // close all others
    setFilterExpanded(false)
    setPropertiesExpanded(false)
  }, [taxonomiesExpanded])
  const onToggleFilter = useCallback(() => {
    const loading = propsByTaxLoading
    if (!filterExpanded && exportTaxonomies.length > 0 && !loading) {
      setFilterExpanded(true)
      // close all others
      setTaxonomiesExpanded(false)
      setPropertiesExpanded(false)
    } else if (!loading) {
      setFilterExpanded(false)
      onSetMessage('Bitte wählen Sie mindestens eine Taxonomie')
    } else {
      setFilterExpanded(false)
      onSetMessage('Bitte warten Sie, bis die Daten geladen sind')
    }
  }, [propsByTaxLoading, filterExpanded, exportTaxonomies.length, onSetMessage])
  const onToggleProperties = useCallback(() => {
    const loading = propsByTaxLoading || exportObjectLoading || synonymLoading
    if (!propertiesExpanded && exportTaxonomies.length > 0 && !loading) {
      setPropertiesExpanded(true)
      // close all others
      setTaxonomiesExpanded(false)
      setFilterExpanded(false)
    } else if (!loading) {
      setPropertiesExpanded(false)
      onSetMessage('Bitte wählen Sie mindestens eine Gruppe')
    } else {
      setPropertiesExpanded(false)
      onSetMessage('Bitte warten Sie, bis die Daten geladen sind')
    }
  }, [
    propsByTaxLoading,
    exportObjectLoading,
    synonymLoading,
    propertiesExpanded,
    exportTaxonomies.length,
    onSetMessage,
  ])

  if (propsByTaxError) {
    return (
      <ErrorContainer>
        `Error fetching data: ${propsByTaxError.message}`
      </ErrorContainer>
    )
  }

  if (exportObjectError) {
    return (
      <ErrorContainer>
        `Error fetching data: ${exportObjectError.message}`
      </ErrorContainer>
    )
  }

  return (
    <ErrorBoundary>
      <SimpleBar style={{ maxHeight: height, height: '100%' }}>
        <Container>
          <StyledCard>
            <StyledCardActions disableSpacing onClick={onToggleTaxonomies}>
              <CardActionTitle>1. Taxonomie(n) wählen</CardActionTitle>
              <CardActionIconButton
                data-expanded={taxonomiesExpanded}
                aria-expanded={taxonomiesExpanded}
                aria-label="Show more"
              >
                <Icon>
                  <ExpandMoreIcon />
                </Icon>
              </CardActionIconButton>
            </StyledCardActions>
            <Collapse in={taxonomiesExpanded} timeout="auto" unmountOnExit>
              <Taxonomies />
            </Collapse>
          </StyledCard>
          <StyledCard>
            <StyledCardActions disableSpacing onClick={onToggleFilter}>
              <CardActionTitle>2. filtern</CardActionTitle>
              <CardActionIconButton
                data-expanded={filterExpanded}
                aria-expanded={filterExpanded}
                aria-label="Show more"
              >
                <Icon>
                  <ExpandMoreIcon />
                </Icon>
              </CardActionIconButton>
            </StyledCardActions>
            <Collapse in={filterExpanded} timeout="auto" unmountOnExit>
              <Filter />
            </Collapse>
          </StyledCard>
          <StyledCard>
            <StyledCardActions disableSpacing onClick={onToggleProperties}>
              <CardActionTitle>3. Eigenschaften wählen</CardActionTitle>
              <CardActionIconButton
                data-expanded={propertiesExpanded}
                aria-expanded={propertiesExpanded}
                aria-label="Show more"
              >
                <Icon>
                  <ExpandMoreIcon />
                </Icon>
              </CardActionIconButton>
            </StyledCardActions>
            <Collapse in={propertiesExpanded} timeout="auto" unmountOnExit>
              <Properties />
            </Collapse>
          </StyledCard>
          <StyledSnackbar open={!!message} message={message} />
        </Container>
      </SimpleBar>
    </ErrorBoundary>
  )
}

export default withResizeDetector(observer(Export))
