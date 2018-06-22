// @flow
import React from 'react'
import styled from 'styled-components'
import { withApollo } from 'react-apollo'
import compose from 'recompose/compose'
import withState from 'recompose/withState'
import withHandlers from 'recompose/withHandlers'
import lifecycle from 'recompose/lifecycle'

import HowTo from './HowTo'
import Taxonomies from './Taxonomies'
import PCOs from './PCOs'
import RCOs from './RCOs'
import exportTaxonomiesData from '../exportTaxonomiesData'
import ErrorBoundary from '../../shared/ErrorBoundary'
import Snackbar from '@material-ui/core/Snackbar'
import exportTaxonomiesMutation from '../exportTaxonomiesMutation'
import constants from '../../../modules/constants'

const Container = styled.div`
  padding: 0 5px;
  overflow: auto !important;
  height: 100%;
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
  lifecycle({
    componentDidMount() {
      const { client } = this.props
      client.mutate({
        mutation: exportTaxonomiesMutation,
        variables: { value: constants.altTaxonomies },
      })
    },
  }),
  exportTaxonomiesData,
  withState('taxonomiesExpanded', 'setTaxonomiesExpanded', false),
  withState('pcoExpanded', 'setPcoExpanded', false),
  withState('rcoExpanded', 'setPropertiesExpanded', false),
  withState('message', 'setMessage', ''),
  withHandlers({
    onToggleTaxonomies: ({
      taxonomiesExpanded,
      setTaxonomiesExpanded,
      setPcoExpanded,
      setPropertiesExpanded,
    }) => () => {
      setTaxonomiesExpanded(!taxonomiesExpanded)
      // TODO (later)
      // check if only one Taxonomy
      // if so: open it

      // close all others
      setPcoExpanded(false)
      setPropertiesExpanded(false)
    },
    onTogglePco: ({
      pcoExpanded,
      setTaxonomiesExpanded,
      setPcoExpanded,
      setPropertiesExpanded,
    }) => () => {
      if (!pcoExpanded) {
        setPcoExpanded(true)
        // close all others
        setTaxonomiesExpanded(false)
        setPropertiesExpanded(false)
      } else {
        setPcoExpanded(false)
      }
    },
    onToggleRco: ({
      rcoExpanded,
      setTaxonomiesExpanded,
      setPcoExpanded,
      setPropertiesExpanded,
    }) => () => {
      if (!rcoExpanded) {
        setPropertiesExpanded(true)
        // close all others
        setTaxonomiesExpanded(false)
        setPcoExpanded(false)
      } else {
        setPropertiesExpanded(false)
      }
    },
    onSetMessage: ({ message, setMessage }) => (message: String) => {
      setMessage(message)
      if (!!message) {
        setTimeout(() => setMessage(''), 5000)
      }
    },
  })
)

const Properties = ({
  taxonomiesExpanded,
  pcoExpanded,
  rcoExpanded,
  onToggleTaxonomies,
  onTogglePco,
  onToggleRco,
  message,
}: {
  taxonomiesExpanded: Boolean,
  pcoExpanded: Boolean,
  rcoExpanded: Boolean,
  onToggleTaxonomies: () => {},
  onTogglePco: () => {},
  onToggleRco: () => {},
  message: String,
}) => {
  return (
    <ErrorBoundary>
      <Container>
        <StyledH3>Eigenschaften wählen</StyledH3>
        <HowTo />
        <Taxonomies
          taxonomiesExpanded={taxonomiesExpanded}
          onToggleTaxonomies={onToggleTaxonomies}
        />
        <PCOs pcoExpanded={pcoExpanded} onTogglePco={onTogglePco} />
        <RCOs rcoExpanded={rcoExpanded} onToggleRco={onToggleRco} />
        <StyledSnackbar open={!!message} message={message} />
      </Container>
    </ErrorBoundary>
  )
}

export default enhance(Properties)
