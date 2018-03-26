// @flow
import React from 'react'
import styled from 'styled-components'
import { withApollo } from 'react-apollo'
import compose from 'recompose/compose'
import withState from 'recompose/withState'
import withHandlers from 'recompose/withHandlers'
import get from 'lodash/get'

import HowTo from './HowTo'
import Taxonomies from './Taxonomies'
import PCOs from './PCOs'
import RCOs from './RCOs'
import propsByTaxData from './propsByTaxData'
import exportTaxonomiesData from '../exportTaxonomiesData'
import data from './data'
import ErrorBoundary from '../../shared/ErrorBoundary'
import Snackbar from 'material-ui/Snackbar'

const Container = styled.div`
  padding: 0 5px;
  overflow: auto !important;
`
const StyledSnackbar = styled(Snackbar)`
  div {
    min-width: auto;
    background-color: #2e7d32 !important;
  }
`
const StyledH3 = styled.h3`
  padding-left: 10px;
`

const enhance = compose(
  withApollo,
  exportTaxonomiesData,
  data,
  propsByTaxData,
  withState('taxonomiesExpanded', 'setTaxonomiesExpanded', false),
  withState('pcoExpanded', 'setFilterExpanded', false),
  withState('rcoExpanded', 'setPropertiesExpanded', false),
  withState('message', 'setMessage', ''),
  withHandlers({
    onSetMessage: ({ message, setMessage }) => (message: String) => {
      setMessage(message)
      if (!!message) {
        setTimeout(() => setMessage(''), 5000)
      }
    },
  }),
  withHandlers({
    onToggleTaxonomies: ({
      taxonomiesExpanded,
      setTaxonomiesExpanded,
      setFilterExpanded,
      setPropertiesExpanded,
    }) => () => {
      setTaxonomiesExpanded(!taxonomiesExpanded)
      // TODO (later)
      // check if only one Taxonomy
      // if so: open it

      // close all others
      setFilterExpanded(false)
      setPropertiesExpanded(false)
    },
    onTogglePco: ({
      pcoExpanded,
      setTaxonomiesExpanded,
      setFilterExpanded,
      setPropertiesExpanded,
    }) => () => {
      if (!pcoExpanded) {
        setFilterExpanded(true)
        // close all others
        setTaxonomiesExpanded(false)
        setPropertiesExpanded(false)
      } else {
        setFilterExpanded(false)
      }
    },
    onToggleRco: ({
      rcoExpanded,
      setTaxonomiesExpanded,
      setFilterExpanded,
      setPropertiesExpanded,
    }) => () => {
      if (!rcoExpanded) {
        setPropertiesExpanded(true)
        // close all others
        setTaxonomiesExpanded(false)
        setFilterExpanded(false)
      } else {
        setPropertiesExpanded(false)
      }
    },
  })
  //withWindowSize,
)

const Properties = ({
  propsByTaxData,
  data,
  taxonomiesExpanded,
  pcoExpanded,
  rcoExpanded,
  onToggleTaxonomies,
  onTogglePco,
  onToggleRco,
  message,
}: {
  propsByTaxData: Object,
  data: Object,
  taxonomiesExpanded: Boolean,
  pcoExpanded: Boolean,
  rcoExpanded: Boolean,
  onToggleTaxonomies: () => {},
  onTogglePco: () => {},
  onToggleRco: () => {},
  message: String,
}) => {
  const pcoProperties = get(
    propsByTaxData,
    'pcoPropertiesByTaxonomiesFunction.nodes',
    []
  )
  const rcoProperties = get(
    propsByTaxData,
    'rcoPropertiesByTaxonomiesFunction.nodes',
    []
  )

  return (
    <ErrorBoundary>
      <Container>
        <StyledH3>Eigenschaften wählen</StyledH3>
        <HowTo />
        <Taxonomies
          taxonomiesExpanded={taxonomiesExpanded}
          onToggleTaxonomies={onToggleTaxonomies}
        />
        {pcoProperties.length > 0 && (
          <PCOs pcoExpanded={pcoExpanded} onTogglePco={onTogglePco} />
        )}
        {rcoProperties.length > 0 && (
          <RCOs rcoExpanded={rcoExpanded} onToggleRco={onToggleRco} />
        )}
        <StyledSnackbar open={!!message} message={message} />
      </Container>
    </ErrorBoundary>
  )
}

export default enhance(Properties)
