// @flow
import React from 'react'
import styled from 'styled-components'
import get from 'lodash/get'
import compose from 'recompose/compose'
import uniqBy from 'lodash/uniqBy'

import TaxonomyObjects from './TaxonomyObjects'
import TaxonomyObject from './TaxonomyObjects/TaxonomyObject'
import PCOs from './PCOs'
import withActiveNodeArrayData from '../../modules/withActiveNodeArrayData'
import withObjectData from './withObjectData'
import ErrorBoundary from '../shared/ErrorBoundary'

const Container = styled.div``
const Container2 = styled.div`
  padding: 10px;
`
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

const enhance = compose(
  withActiveNodeArrayData,
  withObjectData,
)

const Objekt = ({
  objectData,
  stacked = false,
}: {
  objectData: Object,
  stacked: Boolean,
}) => {
  const { loading, error } = objectData
  if (loading) return <Container2>Lade Daten...</Container2>
  if (error) return <Container2>`Fehler: ${error.message}`</Container2>

  const objekt = get(objectData, 'objectById')
  if (!objekt) return <div />
  const propertyCollectionObjects = get(
    objekt,
    'propertyCollectionObjectsByObjectId.nodes',
    [],
  )
  const relations = get(objekt, 'relationsByObjectId.nodes', [])
  const synonyms = get(objekt, 'synonymsByObjectId.nodes', [])
  const synonymObjects = synonyms.map(s => s.objectByObjectIdSynonym)
  const propertyCollectionIds = propertyCollectionObjects.map(
    pco => pco.propertyCollectionId,
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
    pco => pco.propertyCollectionId,
  )
  propertyCollectionObjectsOfSynonyms = propertyCollectionObjectsOfSynonyms.filter(
    pco => !propertyCollectionIds.includes(pco.propertyCollectionId),
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
          <TaxonomyObjects objects={synonymObjects} stacked={stacked} />
          {propertyCollectionObjects.length > 0 && (
            <Title>
              Eigenschaften
              <TitleSpan>{` (${propertyCollectionObjects.length} ${
                propertyCollectionObjects.length > 1 ? 'Sammlungen' : 'Sammlung'
              })`}</TitleSpan>
            </Title>
          )}
          <PCOs
            pCOs={propertyCollectionObjects}
            relations={relations}
            stacked={stacked}
          />
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
          <PCOs
            pCOs={propertyCollectionObjectsOfSynonyms}
            relations={relations}
            stacked={stacked}
          />
        </ScrollContainer>
      </Container>
    </ErrorBoundary>
  )
}

export default enhance(Objekt)
