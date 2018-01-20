// @flow
import React from 'react'
import { Card, CardHeader, CardText } from 'material-ui/Card'
import { FormGroup, FormControlLabel } from 'material-ui-next/Form'
import Checkbox from 'material-ui-next/Checkbox'
import styled from 'styled-components'
import { withApollo } from 'react-apollo'
import get from 'lodash/get'
import groupBy from 'lodash/groupBy'
import sumBy from 'lodash/sumBy'
import compose from 'recompose/compose'
import withState from 'recompose/withState'
import withHandlers from 'recompose/withHandlers'
import app from 'ampersand-app'
//import { withWindowSize } from 'react-fns'

import HowTo from './HowTo'
import Tipps from './Tipps'
import TaxField from './TaxField'
import PcoField from './PcoField'
import RcoField from './RcoField'
//import RcoChooser from './RcoChooser'
import constants from '../../../../modules/constants'
import propsByTaxData from '../../../../modules/propsByTaxData'
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
const Level2Card = styled(Card)`
  margin: 10px 0;
  padding: 0;
  > div {
    padding-bottom: 0 !important;
  }
`
const Level3Card = styled(Card)`
  margin: 0;
  padding: 0;
`
const Level2CardHeader = styled(CardHeader)`
  background-color: #ffcc80;
`
const Level3CardHeader = styled(CardHeader)`
  background-color: #fff3e0;
  border-bottom: 1px solid #ebebeb;
`
const Level2CardText = styled(CardText)`
  padding: 0 !important;
`
const Level3CardText = styled(CardText)`
  padding: 0 !important;
`
const Level2Count = styled.span`
  font-size: x-small;
  padding-left: 5px;
`
const Level3Count = styled.span`
  font-size: x-small;
  padding-left: 5px;
`
const PropertiesContainer = styled.div`
  margin: 8px 0;
  padding-bottom: 10px;
  column-width: ${props =>
    props['data-width'] > 2 * constants.export.properties.columnWidth
      ? `${constants.export.properties.columnWidth}px`
      : 'auto'};
`
const Label = styled(FormControlLabel)`
  height: 30px;
  min-height: 30px;
  > span {
    font-weight: 500;
    line-height: 1em;
  }
`

const level2CardTitleStyle = { fontWeight: 'bold' }

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
  //withWindowSize,
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
}: //width,
{
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
  //width: number,
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
  const taxProperties = get(
    propsByTaxData,
    'taxPropertiesByTaxonomiesFunction.nodes',
    []
  )
  const pcoPropertiesByPropertyCollection = groupBy(
    pcoProperties,
    'propertyCollectionName'
  )
  const pcoPropertiesFields = groupBy(pcoProperties, 'propertyName')
  const pCCount = Object.keys(pcoPropertiesByPropertyCollection).length

  const rcoPropertiesByPropertyCollection = groupBy(rcoProperties, x => {
    if (x.propertyCollectionName.includes(x.relationType)) {
      return x.propertyCollectionName
    }
    return `${x.propertyCollectionName}: ${x.relationType}`
  })
  const rcoPropertiesFields = groupBy(rcoProperties, 'propertyName')
  //console.log('Filter: pcoPropertiesFields:', pcoPropertiesFields)
  const rCCount = Object.keys(rcoPropertiesByPropertyCollection).length

  const taxPropertiesByTaxonomy = groupBy(taxProperties, 'taxonomyName')
  const taxPropertiesFields = groupBy(taxProperties, 'propertyName')
  //console.log('Filter: taxProperties:', taxProperties)
  //console.log('Filter: taxPropertiesByTaxonomy:', taxPropertiesByTaxonomy)
  const taxCount = Object.keys(taxPropertiesByTaxonomy).length
  const taxFieldsCount = Object.keys(taxPropertiesFields).length
  let jointTaxProperties = []
  if (taxCount > 1) {
    jointTaxProperties = Object.values(
      groupBy(taxProperties, t => `${t.propertyName}/${t.jsontype}`)
    )
      .filter(v => v.length === taxCount)
      .map(t => ({
        count: sumBy(t, x => Number(x.count)),
        jsontype: t[0].jsontype,
        propertyName: t[0].propertyName,
        taxonomies: t.map(x => x.taxonomyName),
        taxname: 'Taxonomie',
      }))
    //console.log('Filter: jointTaxProperties:', jointTaxProperties)
  }

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
      <Level2Card
        expanded={taxonomiesExpanded}
        onExpandChange={onToggleTaxonomies}
      >
        <Level2CardHeader
          title={
            <div>
              Taxonomien{taxCount > 0 && (
                <Level2Count>{`(${taxCount} ${
                  taxCount === 1 ? 'Taxonomie' : 'Taxonomien'
                }, ${taxFieldsCount} ${
                  taxFieldsCount === 1 ? 'Feld' : 'Felder'
                })`}</Level2Count>
              )}
            </div>
          }
          actAsExpander={true}
          showExpandableButton={true}
          titleStyle={level2CardTitleStyle}
        />
        <Level2CardText expandable={true}>
          {jointTaxProperties.length > 0 && (
            <Level3Card key="jointTax">
              <Level3CardHeader
                title={
                  <div>
                    {`Gemeinsame Felder`}
                    <Level3Count>{`(${
                      jointTaxProperties.length
                    })`}</Level3Count>
                  </div>
                }
                actAsExpander={true}
                showExpandableButton={true}
                titleStyle={level2CardTitleStyle}
              />
              <Level3CardText expandable={true}>
                <PropertiesContainer data-width={window.innerWidth - 84}>
                  {jointTaxProperties.map(field => (
                    <TaxField
                      key={`${field.propertyName}${field.jsontype}`}
                      taxname="Taxonomie"
                      pname={field.propertyName}
                      jsontype={field.jsontype}
                    />
                  ))}
                </PropertiesContainer>
              </Level3CardText>
            </Level3Card>
          )}
          {Object.keys(taxPropertiesByTaxonomy).map(pc => (
            <Level3Card key={pc}>
              <Level3CardHeader
                title={
                  <div>
                    {pc}
                    <Level3Count>{`(${taxPropertiesByTaxonomy[pc].length} ${
                      taxPropertiesByTaxonomy[pc].length === 1
                        ? 'Feld'
                        : 'Felder'
                    })`}</Level3Count>
                  </div>
                }
                actAsExpander={true}
                showExpandableButton={true}
                titleStyle={level2CardTitleStyle}
              />
              <Level3CardText expandable={true}>
                <PropertiesContainer data-width={window.innerWidth - 84}>
                  {taxPropertiesByTaxonomy[pc].map(field => (
                    <TaxField
                      key={`${field.propertyName}${field.jsontype}`}
                      taxname={field.taxonomyName}
                      pname={field.propertyName}
                      jsontype={field.jsontype}
                    />
                  ))}
                </PropertiesContainer>
              </Level3CardText>
            </Level3Card>
          ))}
        </Level2CardText>
      </Level2Card>
      <Level2Card expanded={pcoExpanded} onExpandChange={onTogglePco}>
        <Level2CardHeader
          title={
            <div>
              Eigenschaftensammlungen{pCCount > 0 && (
                <Level2Count>{`(${pCCount} Sammlungen, ${
                  Object.keys(pcoPropertiesFields).length
                } ${
                  Object.keys(pcoPropertiesFields).length === 1
                    ? 'Feld'
                    : 'Felder'
                })`}</Level2Count>
              )}
            </div>
          }
          actAsExpander={true}
          showExpandableButton={true}
          titleStyle={level2CardTitleStyle}
        />
        <Level2CardText expandable={true}>
          {Object.keys(pcoPropertiesByPropertyCollection).map(pc => (
            <Level3Card key={pc}>
              <Level3CardHeader
                title={
                  <div>
                    {pc}
                    <Level3Count>{`(${
                      pcoPropertiesByPropertyCollection[pc].length
                    } ${
                      pcoPropertiesByPropertyCollection[pc].length === 1
                        ? 'Feld'
                        : 'Felder'
                    })`}</Level3Count>
                  </div>
                }
                actAsExpander={true}
                showExpandableButton={true}
                titleStyle={level2CardTitleStyle}
              />
              <Level3CardText expandable={true}>
                <PropertiesContainer data-width={window.innerWidth - 84}>
                  {pcoPropertiesByPropertyCollection[pc].map(field => (
                    <PcoField
                      key={`${field.propertyName}${field.jsontype}`}
                      pcname={field.propertyCollectionName}
                      pname={field.propertyName}
                      jsontype={field.jsontype}
                    />
                  ))}
                </PropertiesContainer>
              </Level3CardText>
            </Level3Card>
          ))}
        </Level2CardText>
      </Level2Card>
      <Level2Card expanded={rcoExpanded} onExpandChange={onToggleRco}>
        <Level2CardHeader
          title={
            <div>
              Beziehungssammlungen{rCCount > 0 && (
                <Level2Count>{`(${rCCount} Sammlungen, ${
                  Object.keys(rcoPropertiesFields).length
                } ${
                  Object.keys(rcoPropertiesFields).length === 1
                    ? 'Feld'
                    : 'Felder'
                })`}</Level2Count>
              )}
            </div>
          }
          actAsExpander={true}
          showExpandableButton={true}
          titleStyle={level2CardTitleStyle}
        />
        <Level2CardText expandable={true}>
          {Object.keys(rcoPropertiesByPropertyCollection).map(pc => (
            <Level3Card key={pc}>
              <Level3CardHeader
                title={
                  <div>
                    {pc}
                    <Level3Count>{`(${
                      rcoPropertiesByPropertyCollection[pc].length
                    } ${
                      rcoPropertiesByPropertyCollection[pc].length === 1
                        ? 'Feld'
                        : 'Felder'
                    })`}</Level3Count>
                  </div>
                }
                actAsExpander={true}
                showExpandableButton={true}
                titleStyle={level2CardTitleStyle}
              />
              <Level3CardText expandable={true}>
                <PropertiesContainer data-width={window.innerWidth - 84}>
                  {rcoPropertiesByPropertyCollection[pc].map(field => (
                    <RcoField
                      key={`${field.propertyName}${field.jsontype}`}
                      pcname={field.propertyCollectionName}
                      pname={field.propertyName}
                      jsontype={field.jsontype}
                    />
                  ))}
                </PropertiesContainer>
              </Level3CardText>
            </Level3Card>
          ))}
        </Level2CardText>
      </Level2Card>
    </Container>
  )
}

export default enhance(Filter)
