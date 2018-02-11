// @flow
import React from 'react'
import { Card, CardHeader, CardText } from 'material-ui/Card'
import styled from 'styled-components'
import { withApollo } from 'react-apollo'
import get from 'lodash/get'
import groupBy from 'lodash/groupBy'
import sumBy from 'lodash/sumBy'
import compose from 'recompose/compose'
import withState from 'recompose/withState'
import withHandlers from 'recompose/withHandlers'

import HowTo from './HowTo'
import AllTaxChooser from './AllTaxChooser'
import AllPcoChooser from './AllPcoChooser'
import AllRcoChooser from './AllRcoChooser'
import TaxChooser from './TaxChooser'
import PcoChooser from './PcoChooser'
import RcoChooser from './RcoChooser'
import constants from '../../../../modules/constants'
import propsByTaxData from '../propsByTaxData'
import exportTaxonomiesData from '../../exportTaxonomiesData'
import data from './data'
import ErrorBoundary from '../../../shared/ErrorBoundary'

const Container = styled.div`
  padding: 5px 10px;
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
  display: flex;
  flex-direction: column;
`
const PropertiesContainer = styled.div`
  column-width: ${props =>
    props['data-width'] > 2 * constants.export.properties.columnWidth
      ? `${constants.export.properties.columnWidth}px`
      : 'auto'};
`
const Level2Count = styled.span`
  font-size: x-small;
  padding-left: 5px;
`
const Level3Count = styled.span`
  font-size: x-small;
  padding-left: 5px;
`

const level2CardTitleStyle = { fontWeight: 'bold' }

const enhance = compose(
  withApollo,
  exportTaxonomiesData,
  data,
  propsByTaxData,
  withState('jointTaxonomiesExpanded', 'setJointTaxonomiesExpanded', false),
  withState('taxonomiesExpanded', 'setTaxonomiesExpanded', false),
  withState('pcoExpanded', 'setFilterExpanded', false),
  withState('rcoExpanded', 'setPropertiesExpanded', false),
  withHandlers({
    onToggleJointTaxonomies: ({
      jointTaxonomiesExpanded,
      setJointTaxonomiesExpanded,
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
      setJointTaxonomiesExpanded,
      setTaxonomiesExpanded,
      setFilterExpanded,
      setPropertiesExpanded,
    }) => () => {
      setTaxonomiesExpanded(!taxonomiesExpanded)
      // TODO (later)
      // check if only one Taxonomy
      // if so: open it

      // close all others
      setJointTaxonomiesExpanded(false)
      setFilterExpanded(false)
      setPropertiesExpanded(false)
    },
    onTogglePco: ({
      pcoExpanded,
      setJointTaxonomiesExpanded,
      setTaxonomiesExpanded,
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
      setJointTaxonomiesExpanded,
      setTaxonomiesExpanded,
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

const Properties = ({
  propsByTaxData,
  data,
  jointTaxonomiesExpanded,
  taxonomiesExpanded,
  pcoExpanded,
  rcoExpanded,
  onToggleJointTaxonomies,
  onToggleTaxonomies,
  onTogglePco,
  onToggleRco,
}: {
  propsByTaxData: Object,
  data: Object,
  onToggleJointTaxonomies: Boolean,
  jointTaxonomiesExpanded: Boolean,
  taxonomiesExpanded: Boolean,
  pcoExpanded: Boolean,
  rcoExpanded: Boolean,
  onToggleTaxonomies: () => {},
  onTogglePco: () => {},
  onToggleRco: () => {},
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
  //console.log('Properties: rcoProperties:', rcoProperties)
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
  // TODO: need to add BeziehungsPartnerId and BeziehungsPartnerName
  const rcoCountByTaxonomyRelationType = get(
    data,
    'rcoCountByTaxonomyRelationTypeFunction.nodes',
    []
  )
  // TODO:
  // in every key of rcoPropertiesByPropertyCollection
  // add id and name of Beziehungspartner

  Object.values(rcoPropertiesByPropertyCollection).forEach(rpc => {
    const myRpc = rpc[0] || {}
    let rco = rcoCountByTaxonomyRelationType.find(
      r =>
        r.propertyCollectionName === myRpc.propertyCollectionName &&
        r.relationType === myRpc.relationType
    )
    if (!rco) {
      rco = rcoCountByTaxonomyRelationType.find(
        r =>
          `${r.propertyCollectionName}: ${r.relationType}` ===
            myRpc.propertyCollectionName &&
          r.relationType === myRpc.relationType
      )
    }
    if (!rco) rco = {}
    rpc.push({
      count: rco.count,
      jsontype: 'String',
      propertyCollectionName: myRpc.propertyCollectionName,
      propertyName: 'Beziehungspartner_id',
      relationType: myRpc.relationType,
    })
    rpc.push({
      count: rco.count,
      jsontype: 'String',
      propertyCollectionName: myRpc.propertyCollectionName,
      propertyName: 'Beziehungspartner_Name',
      relationType: myRpc.relationType,
    })
  })
  const rcoPropertiesFields = groupBy(rcoProperties, 'propertyName')
  //console.log('Properties: pcoPropertiesFields:', pcoPropertiesFields)
  /*console.log(
    'Properties: rcoPropertiesByPropertyCollection:',
    rcoPropertiesByPropertyCollection
  )*/
  const rCCount = Object.keys(rcoPropertiesByPropertyCollection).length

  const taxPropertiesByTaxonomy = groupBy(taxProperties, 'taxonomyName')
  const taxPropertiesFields = groupBy(taxProperties, 'propertyName')
  //console.log('Properties: taxPropertiesByTaxonomy:', taxPropertiesByTaxonomy)
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
  }

  return (
    <ErrorBoundary>
      <Container>
        <HowTo />
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
                  {jointTaxProperties.length > 1 && (
                    <AllTaxChooser properties={jointTaxProperties} />
                  )}
                  <PropertiesContainer data-width={window.innerWidth - 84}>
                    {jointTaxProperties.map(field => (
                      <TaxChooser
                        key={`${field.propertyName}${field.jsontype}`}
                        taxname={'Taxonomie'}
                        pname={field.propertyName}
                        jsontype={field.jsontype}
                        count={field.count}
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
                  {taxPropertiesByTaxonomy[pc].length > 1 && (
                    <AllTaxChooser properties={taxPropertiesByTaxonomy[pc]} />
                  )}
                  <PropertiesContainer data-width={window.innerWidth - 84}>
                    {taxPropertiesByTaxonomy[pc].map(field => (
                      <TaxChooser
                        key={`${field.propertyName}${field.jsontype}`}
                        taxname={field.taxonomyName}
                        pname={field.propertyName}
                        jsontype={field.jsontype}
                        count={field.count}
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
                  {pcoPropertiesByPropertyCollection[pc].length > 1 && (
                    <AllPcoChooser
                      properties={pcoPropertiesByPropertyCollection[pc]}
                    />
                  )}
                  <PropertiesContainer data-width={window.innerWidth - 84}>
                    {pcoPropertiesByPropertyCollection[pc].map(field => (
                      <PcoChooser
                        key={`${field.propertyName}${field.jsontype}`}
                        pcname={field.propertyCollectionName}
                        pname={field.propertyName}
                        jsontype={field.jsontype}
                        count={field.count}
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
                  {rcoPropertiesByPropertyCollection[pc].length > 1 && (
                    <AllRcoChooser
                      properties={rcoPropertiesByPropertyCollection[pc]}
                    />
                  )}
                  <PropertiesContainer data-width={window.innerWidth - 84}>
                    {rcoPropertiesByPropertyCollection[pc].map(field => (
                      <RcoChooser
                        key={`${field.propertyName}${field.jsontype}`}
                        pcname={field.propertyCollectionName}
                        pname={field.propertyName}
                        jsontype={field.jsontype}
                        count={field.count}
                      />
                    ))}
                  </PropertiesContainer>
                </Level3CardText>
              </Level3Card>
            ))}
          </Level2CardText>
        </Level2Card>
      </Container>
    </ErrorBoundary>
  )
}

export default enhance(Properties)
