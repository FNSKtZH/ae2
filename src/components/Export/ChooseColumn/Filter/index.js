// @flow
import React from 'react'
import { FormGroup, FormControlLabel } from 'material-ui-next/Form'
import Checkbox from 'material-ui-next/Checkbox'
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
import TaxonomiesCard from './TaxonomiesCard'
import PcoCard from './PcoCard'
import RcoCard from './RcoCard'
import propsByTaxData from '../propsByTaxData'
import exportTaxonomiesData from '../../exportTaxonomiesData'
import exportWithSynonymDataData from '../../exportWithSynonymDataData'
import exportWithSynonymDataMutation from '../../exportWithSynonymDataMutation'
import exportOnlyRowsWithPropertiesData from '../../exportOnlyRowsWithPropertiesData'
import exportOnlyRowsWithPropertiesMutation from '../../exportOnlyRowsWithPropertiesMutation'

const Container = styled.div`
  padding: 5px 10px;
  height: calc(100% - 48px);
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
  const exportOnlyRowsWithProperties = get(
    exportOnlyRowsWithPropertiesData,
    'exportOnlyRowsWithProperties',
    true
  )

  return (
    <Container>
      <HowTo />
      <Tipps />
      <FormGroup>
        <Label
          control={
            <Checkbox
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
      </FormGroup>
      <Id />
      <TaxonomiesCard
        taxonomiesExpanded={taxonomiesExpanded}
        jointTaxonomiesExpanded={jointTaxonomiesExpanded}
        onToggleTaxonomies={onToggleTaxonomies}
        onToggleJointTaxonomies={onToggleJointTaxonomies}
      />
      <PcoCard pcoExpanded={pcoExpanded} onTogglePco={onTogglePco} />
      <RcoCard rcoExpanded={rcoExpanded} onToggleRco={onToggleRco} />
    </Container>
  )
}

export default enhance(Filter)
