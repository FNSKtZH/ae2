// @flow
import React, { useCallback, useState, useContext } from 'react'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import Collapse from '@material-ui/core/Collapse'
import IconButton from '@material-ui/core/IconButton'
import Icon from '@material-ui/core/Icon'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Snackbar from '@material-ui/core/Snackbar'
import styled from 'styled-components'
import get from 'lodash/get'
import omit from 'lodash/omit'
import { useQuery } from 'react-apollo-hooks'
import gql from 'graphql-tag'
import { observer } from 'mobx-react-lite'

import Taxonomies from './Taxonomies'
import Properties from './Properties'
import Filter from './Filter'
import ErrorBoundary from '../../shared/ErrorBoundary'
import mobxStoreContext from '../../../mobxStoreContext'

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
  transform: ${props => (props['data-expanded'] ? 'rotate(180deg)' : 'none')};
`
const CardActionTitle = styled.div`
  padding-left: 8px;
  font-weight: bold;
  word-break: break-word;
`

const Container = styled.div`
  padding: 0 5px;
  overflow-x: hidden !important;
  overflow-y: auto !important;
  height: 100%;
`
const ErrorContainer = styled.div`
  padding: 10px;
`

const storeQuery = gql`
  query exportTaxonomiesQuery {
    exportTaxonomies @client
    exportTaxFilters @client {
      taxname
      pname
      comparator
      value
    }
    exportRcoFilters @client {
      pcname
      pname
      relationtype
      comparator
      value
    }
    exportRcoProperties @client {
      pcname
      relationtype
      pname
    }
  }
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
  query Query(
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

const Export = () => {
  const mobxStore = useContext(mobxStoreContext)
  const { taxonomies: exportTaxonomies } = mobxStore.export

  const { data: storeData } = useQuery(storeQuery, { suspend: false })
  // need to remove __typename because apollo passes it along ?!
  const taxFilters = get(storeData, 'exportTaxFilters', []).map(d =>
    omit(d, ['__typename']),
  )
  const taxProperties = get(storeData, 'exportTaxProperties', []).map(d =>
    omit(d, ['__typename']),
  )
  const fetchTaxProperties = taxProperties.length > 0
  const { loading: propsByTaxLoading, error: propsByTaxError } = useQuery(
    propsByTaxQuery,
    {
      suspend: false,
      variables: {
        exportTaxonomies,
        queryExportTaxonomies: exportTaxonomies.length > 0,
      },
    },
  )
  const { loading: exportObjectLoading, error: exportObjectError } = useQuery(
    exportObjectQuery,
    {
      suspend: false,
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
      suspend: false,
      variables: {
        rcoFilters,
        rcoProperties,
        fetchRcoProperties,
      },
    },
  )*/
  const { loading: synonymLoading } = useQuery(synonymQuery, { suspend: false })

  const [taxonomiesExpanded, setTaxonomiesExpanded] = useState(true)
  const [filterExpanded, setFilterExpanded] = useState(false)
  const [propertiesExpanded, setPropertiesExpanded] = useState(false)
  const [message, setMessage] = useState('')

  const onSetMessage = useCallback(message => {
    setMessage(message)
    if (!!message) {
      setTimeout(() => setMessage(''), 5000)
    }
  })
  const onToggleTaxonomies = useCallback(
    () => {
      setTaxonomiesExpanded(!taxonomiesExpanded)
      // close all others
      setFilterExpanded(false)
      setPropertiesExpanded(false)
    },
    [taxonomiesExpanded],
  )
  const onToggleFilter = useCallback(
    () => {
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
    },
    [exportTaxonomies, propsByTaxLoading, filterExpanded],
  )
  const onToggleProperties = useCallback(
    () => {
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
    },
    [
      propertiesExpanded,
      exportTaxonomies.length,
      propsByTaxLoading,
      exportObjectLoading,
      synonymLoading,
    ],
  )

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
      <Container>
        <StyledCard>
          <StyledCardActions disableActionSpacing onClick={onToggleTaxonomies}>
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
          <StyledCardActions disableActionSpacing onClick={onToggleFilter}>
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
          <StyledCardActions disableActionSpacing onClick={onToggleProperties}>
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
    </ErrorBoundary>
  )
}

export default observer(Export)
