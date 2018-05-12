// @flow
import React from 'react'
import styled from 'styled-components'
import get from 'lodash/get'
import compose from 'recompose/compose'
import sortBy from 'lodash/sortBy'
import uniqBy from 'lodash/uniqBy'

import TaxonomyObject from './TaxonomyObject'
import PCO from './PCO'
import activeNodeArrayData from '../../modules/activeNodeArrayData'
import objectData from './objectData'
import ErrorBoundary from '../shared/ErrorBoundary'

const Container = styled.div``
const ScrollContainer = styled.div`
  height: 100%;
  overflow: auto !important;
`
const Title = styled.h3`
  margin: 15px 0 -5px 0;
  padding-left: 12px;
`
const TitleSpan = styled.span`
  font-weight: normal;
  font-size: small;
  margin-left: 4px;
`
const FirstTitle = styled(Title)`
  margin: 10px 0 5px 0;
`
const SynonymTitle = styled(Title)`
  margin-bottom: 5px;
`

const enhance = compose(activeNodeArrayData, objectData)

const Objekt = ({
  objectData,
  stacked = false,
}: {
  objectData: Object,
  stacked: Boolean,
}) => {
  const objekt = get(objectData, 'objectById')
  if (!objekt) return <div />
  const propertyCollectionObjects = get(
    objekt,
    'propertyCollectionObjectsByObjectId.nodes',
    []
  )
  const relations = get(objekt, 'relationsByObjectId.nodes', [])
  const synonyms = get(objekt, 'synonymsByObjectId.nodes', [])
  const synonymObjects = synonyms.map(s => s.objectByObjectIdSynonym)
  const propertyCollectionIds = propertyCollectionObjects.map(
    pco => pco.propertyCollectionId
  )
  let propertyCollectionObjectsOfSynonyms = []
  synonymObjects.forEach(synonym => {
    propertyCollectionObjectsOfSynonyms = [
      ...propertyCollectionObjectsOfSynonyms,
      ...get(synonym, 'propertyCollectionObjectsByObjectId.nodes', []),
    ]
  })
  propertyCollectionObjectsOfSynonyms = uniqBy(
    propertyCollectionObjectsOfSynonyms,
    pco => pco.propertyCollectionId
  )
  propertyCollectionObjectsOfSynonyms = propertyCollectionObjectsOfSynonyms.filter(
    pco => !propertyCollectionIds.includes(pco.propertyCollectionId)
  )

  return (
    <ErrorBoundary>
      <Container>
        <ScrollContainer>
          <FirstTitle>Taxonomie</FirstTitle>
          <TaxonomyObject objekt={objekt} stacked={stacked} />
          {synonymObjects.length > 0 && (
            <SynonymTitle>
              {synonymObjects.length > 1 ? 'Synonyme' : 'Synonym'}
              <TitleSpan>
                {synonymObjects.length > 1 ? ` (${synonymObjects.length})` : ''}
              </TitleSpan>
            </SynonymTitle>
          )}
          {sortBy(synonymObjects, tO =>
            get(tO, 'taxonomyByTaxonomyId.name', '(Name fehlt)')
          ).map(o => (
            <TaxonomyObject key={o.id} objekt={o} showLink stacked={stacked} />
          ))}
          {propertyCollectionObjects.length > 0 && (
            <Title>
              Eigenschaften
              <TitleSpan>{` (${propertyCollectionObjects.length} ${
                propertyCollectionObjects.length > 1 ? 'Sammlungen' : 'Sammlung'
              })`}</TitleSpan>
            </Title>
          )}
          {sortBy(propertyCollectionObjects, pCO =>
            get(
              pCO,
              'propertyCollectionByPropertyCollectionId.name',
              '(Name fehlt)'
            )
          ).map((pCO, index) => (
            <PCO
              key={`${pCO.propertyCollectionId}`}
              pCO={pCO}
              relations={relations.filter(
                r => r.propertyCollectionId === pCO.propertyCollectionId
              )}
              stacked={stacked}
            />
          ))}
          {propertyCollectionObjectsOfSynonyms.length > 0 && (
            <Title>
              Eigenschaften von Synonymen
              <TitleSpan>
                {` (${propertyCollectionObjectsOfSynonyms.length} ${
                  propertyCollectionObjectsOfSynonyms.length > 1
                    ? 'Sammlungen'
                    : 'Sammlung'
                })`}
              </TitleSpan>
            </Title>
          )}
          {sortBy(propertyCollectionObjectsOfSynonyms, pCO =>
            get(
              pCO,
              'propertyCollectionByPropertyCollectionId.name',
              '(Name fehlt)'
            )
          ).map((pCO, index) => (
            <PCO
              key={`${pCO.propertyCollectionId}`}
              pCO={pCO}
              relations={relations.filter(
                r => r.propertyCollectionId === pCO.propertyCollectionId
              )}
              stacked={stacked}
            />
          ))}
        </ScrollContainer>
      </Container>
    </ErrorBoundary>
  )
}

export default enhance(Objekt)
