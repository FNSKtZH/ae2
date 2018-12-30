// @flow
import React, { useState, useCallback } from 'react'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import styled from 'styled-components'
import { withApollo } from 'react-apollo'
import get from 'lodash/get'
import compose from 'recompose/compose'
import app from 'ampersand-app'

import HowTo from './HowTo'
import Tipps from './Tipps'
import Id from './Id'
import Taxonomies from './Taxonomies'
import PCOs from './PCOs'
import RCOs from './RCOs'
import withPropsByTaxData from '../withPropsByTaxData'
import withExportTaxonomiesData from '../../withExportTaxonomiesData'
import withExportWithSynonymDataData from '../../withExportWithSynonymDataData'
import exportWithSynonymDataMutation from '../../exportWithSynonymDataMutation'
import withExportAddFilterFieldsData from '../../withExportAddFilterFieldsData'
import exportAddFilterFieldsMutation from '../../exportAddFilterFieldsMutation'
import withExportOnlyRowsWithPropertiesData from '../../withExportOnlyRowsWithPropertiesData'
import exportOnlyRowsWithPropertiesMutation from '../../exportOnlyRowsWithPropertiesMutation'
import ErrorBoundary from '../../../shared/ErrorBoundary'

const Container = styled.div`
  padding: 0 5px;
  overflow: auto !important;
`
const Label = styled(FormControlLabel)`
  height: 30px;
  min-height: 30px;
  > span {
    font-weight: 500;
    line-height: 1em;
  }
`

const enhance = compose(
  withApollo,
  withExportTaxonomiesData,
  withPropsByTaxData,
  withExportWithSynonymDataData,
  withExportAddFilterFieldsData,
  withExportOnlyRowsWithPropertiesData,
)

const Filter = ({
  propsByTaxData,
  exportWithSynonymDataData,
  exportAddFilterFieldsData,
  exportOnlyRowsWithPropertiesData,
}: {
  propsByTaxData: Object,
  exportWithSynonymDataData: Object,
  exportAddFilterFieldsData: Object,
  exportOnlyRowsWithPropertiesData: Object,
}) => {
  const [jointTaxonomiesExpanded, setJointTaxonomiesExpanded] = useState(false)
  const [taxonomiesExpanded, setTaxonomiesExpanded] = useState(false)
  const [pcoExpanded, setFilterExpanded] = useState(false)
  const [rcoExpanded, setPropertiesExpanded] = useState(false)

  const onToggleJointTaxonomies = useCallback(
    () => {
      setJointTaxonomiesExpanded(!jointTaxonomiesExpanded)
      // close all others
      setTaxonomiesExpanded(false)
      setFilterExpanded(false)
      setPropertiesExpanded(false)
    },
    [jointTaxonomiesExpanded],
  )
  const onToggleTaxonomies = useCallback(
    () => {
      setTaxonomiesExpanded(!taxonomiesExpanded)
      // close all others
      setJointTaxonomiesExpanded(false)
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
        setJointTaxonomiesExpanded(false)
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
        setJointTaxonomiesExpanded(false)
        setTaxonomiesExpanded(false)
        setFilterExpanded(false)
      } else {
        setPropertiesExpanded(false)
      }
    },
    [rcoExpanded],
  )

  const exportWithSynonymData = get(
    exportWithSynonymDataData,
    'exportWithSynonymData',
    true,
  )
  const exportAddFilterFields = get(
    exportAddFilterFieldsData,
    'exportAddFilterFields',
    true,
  )
  const exportOnlyRowsWithProperties = get(
    exportOnlyRowsWithPropertiesData,
    'exportOnlyRowsWithProperties',
    true,
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
        <Tipps />
        <FormGroup>
          <Label
            control={
              <Checkbox
                color="primary"
                checked={exportWithSynonymData}
                onChange={(event, checked) => {
                  app.client.mutate({
                    mutation: exportWithSynonymDataMutation,
                    variables: { value: checked },
                  })
                }}
              />
            }
            label="Informationen von Synonymen mit exportieren"
          />
          <Label
            control={
              <Checkbox
                color="primary"
                checked={exportOnlyRowsWithProperties}
                onChange={(event, checked) => {
                  app.client.mutate({
                    mutation: exportOnlyRowsWithPropertiesMutation,
                    variables: { value: checked },
                  })
                }}
              />
            }
            label="Nur Datensätze mit Eigenschaften exportieren"
          />
          <Label
            control={
              <Checkbox
                color="primary"
                checked={exportAddFilterFields}
                onChange={(event, checked) => {
                  app.client.mutate({
                    mutation: exportAddFilterFieldsMutation,
                    variables: { value: checked },
                  })
                }}
              />
            }
            label="Gefilterte Felder immer exportieren"
          />
        </FormGroup>
        <Id />
        <Taxonomies
          taxonomiesExpanded={taxonomiesExpanded}
          jointTaxonomiesExpanded={jointTaxonomiesExpanded}
          onToggleTaxonomies={onToggleTaxonomies}
          onToggleJointTaxonomies={onToggleJointTaxonomies}
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

export default enhance(Filter)
