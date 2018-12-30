// @flow
import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import { withApollo } from 'react-apollo'
import compose from 'recompose/compose'
import get from 'lodash/get'

import HowTo from './HowTo'
import Taxonomies from './Taxonomies'
import PCOs from './PCOs'
import RCOs from './RCOs'
import withPropsByTaxData from '../withPropsByTaxData'
import withExportTaxonomiesData from '../../withExportTaxonomiesData'
import withData from './withData'
import ErrorBoundary from '../../../shared/ErrorBoundary'

const Container = styled.div`
  padding: 0 5px;
  overflow: auto !important;
`

const enhance = compose(
  withApollo,
  withExportTaxonomiesData,
  withData,
  withPropsByTaxData,
)

const Properties = ({
  propsByTaxData,
  data,
}: {
  propsByTaxData: Object,
  data: Object,
}) => {
  const [taxonomiesExpanded, setTaxonomiesExpanded] = useState(false)
  const [pcoExpanded, setFilterExpanded] = useState(false)
  const [rcoExpanded, setPropertiesExpanded] = useState(false)

  const onToggleTaxonomies = useCallback(
    () => {
      setTaxonomiesExpanded(!taxonomiesExpanded)
      // TODO (later)
      // check if only one Taxonomy
      // if so: open it

      // close all others
      setFilterExpanded(false)
      setPropertiesExpanded(false)
    },
    [taxonomiesExpanded],
  )
  const onTogglePco = useCallback(
    () => {
      if (!pcoExpanded) {
        setFilterExpanded(true)
        // close all others
        setTaxonomiesExpanded(false)
        setPropertiesExpanded(false)
      } else {
        setFilterExpanded(false)
      }
    },
    [pcoExpanded],
  )
  const onToggleRco = useCallback(
    () => {
      if (!rcoExpanded) {
        setPropertiesExpanded(true)
        // close all others
        setTaxonomiesExpanded(false)
        setFilterExpanded(false)
      } else {
        setPropertiesExpanded(false)
      }
    },
    [rcoExpanded],
  )

  const pcoProperties = get(
    propsByTaxData,
    'pcoPropertiesByTaxonomiesFunction.nodes',
    [],
  )
  const rcoProperties = get(
    propsByTaxData,
    'rcoPropertiesByTaxonomiesFunction.nodes',
    [],
  )

  return (
    <ErrorBoundary>
      <Container>
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
      </Container>
    </ErrorBoundary>
  )
}

export default enhance(Properties)
