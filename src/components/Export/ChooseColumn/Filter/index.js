// @flow
import React from 'react'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import styled from 'styled-components'
import { withApollo } from 'react-apollo'
import get from 'lodash/get'
import compose from 'recompose/compose'
import withState from 'recompose/withState'
import withHandlers from 'recompose/withHandlers'
import app from 'ampersand-app'

import HowTo from './HowTo'
import Tipps from './Tipps'
import Id from './Id'
import Taxonomies from './Taxonomies'
import PCOs from './PCOs'
import RCOs from './RCOs'
import propsByTaxData from '../propsByTaxData'
import exportTaxonomiesData from '../../exportTaxonomiesData'
import exportWithSynonymDataData from '../../exportWithSynonymDataData'
import exportWithSynonymDataMutation from '../../exportWithSynonymDataMutation'
import exportAddFilterFieldsData from '../../exportAddFilterFieldsData'
import exportAddFilterFieldsMutation from '../../exportAddFilterFieldsMutation'
import exportOnlyRowsWithPropertiesData from '../../exportOnlyRowsWithPropertiesData'
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
  exportTaxonomiesData,
  propsByTaxData,
  exportWithSynonymDataData,
  exportAddFilterFieldsData,
  exportOnlyRowsWithPropertiesData,
  withState('jointTaxonomiesExpanded', 'setJointTaxonomiesExpanded', false),
  withState('taxonomiesExpanded', 'setTaxonomiesExpanded', false),
  withState('pcoExpanded', 'setFilterExpanded', false),
  withState('rcoExpanded', 'setPropertiesExpanded', false),
  withHandlers({
    onToggleJointTaxonomies: ({
      jointTaxonomiesExpanded,
      setJointTaxonomiesExpanded,
      taxonomiesExpanded,
      setTaxonomiesExpanded,
      setFilterExpanded,
      setPropertiesExpanded,
    }) => () => {
      setJointTaxonomiesExpanded(!jointTaxonomiesExpanded)
      // close all others
      setTaxonomiesExpanded(false)
      setFilterExpanded(false)
      setPropertiesExpanded(false)
    },
    onToggleTaxonomies: ({
      taxonomiesExpanded,
      setTaxonomiesExpanded,
      setJointTaxonomiesExpanded,
      setFilterExpanded,
      setPropertiesExpanded,
    }) => () => {
      setTaxonomiesExpanded(!taxonomiesExpanded)
      // close all others
      setJointTaxonomiesExpanded(false)
      setFilterExpanded(false)
      setPropertiesExpanded(false)
    },
    onTogglePco: ({
      pcoExpanded,
      setTaxonomiesExpanded,
      setJointTaxonomiesExpanded,
      setFilterExpanded,
      setPropertiesExpanded,
    }) => () => {
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
    onToggleRco: ({
      rcoExpanded,
      setTaxonomiesExpanded,
      setJointTaxonomiesExpanded,
      setFilterExpanded,
      setPropertiesExpanded,
    }) => () => {
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
  })
)

const Filter = ({
  propsByTaxData,
  exportWithSynonymDataData,
  exportAddFilterFieldsData,
  exportOnlyRowsWithPropertiesData,
  taxonomiesExpanded,
  jointTaxonomiesExpanded,
  pcoExpanded,
  rcoExpanded,
  onToggleTaxonomies,
  onToggleJointTaxonomies,
  onTogglePco,
  onToggleRco,
}: {
  propsByTaxData: Object,
  exportWithSynonymDataData: Object,
  exportAddFilterFieldsData: Object,
  exportOnlyRowsWithPropertiesData: Object,
  taxonomiesExpanded: Boolean,
  jointTaxonomiesExpanded: Boolean,
  pcoExpanded: Boolean,
  rcoExpanded: Boolean,
  onToggleTaxonomies: () => {},
  onToggleJointTaxonomies: () => {},
  onTogglePco: () => {},
  onToggleRco: () => {},
}) => {
  const exportWithSynonymData = get(
    exportWithSynonymDataData,
    'exportWithSynonymData',
    true
  )
  const exportAddFilterFields = get(
    exportAddFilterFieldsData,
    'exportAddFilterFields',
    true
  )
  const exportOnlyRowsWithProperties = get(
    exportOnlyRowsWithPropertiesData,
    'exportOnlyRowsWithProperties',
    true
  )
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
