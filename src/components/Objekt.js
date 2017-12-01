// @flow
import React from 'react'
import styled from 'styled-components'
import get from 'lodash/get'
import compose from 'recompose/compose'
import sortBy from 'lodash/sortBy'
import uniqBy from 'lodash/uniqBy'

import TaxonomyObject from './TaxonomyObject'
import PropertyCollectionObject from './PropertyCollectionObject'
import activeNodeArrayData from '../modules/activeNodeArrayData'
import activeObjectData from '../modules/activeObjectData'

const Container = styled.div`
  padding: 5px;
  height: calc(100% - 48px);
  overflow: auto !important;
`
const Title = styled.h3`
  margin: 15px 0 -5px 0;
`
const TitleSpan = styled.span`
  font-weight: normal;
`
const FirstTitle = styled(Title)`
  margin: 5px 0 -5px 0;
`

const enhance = compose(activeNodeArrayData, activeObjectData)

const Objekt = ({ activeObjectData }: { activeObjectData: Object }) => {
  const activeObject = get(activeObjectData, 'objectById')
  if (!activeObject) return <div />
  const propertyCollectionObjects = get(
    activeObject,
    'propertyCollectionObjectsByObjectId.nodes',
    []
  )
  const relations = get(activeObject, 'relationsByObjectId.nodes', [])
  const synonyms = get(activeObject, 'synonymsByObjectId.nodes', [])
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
    <Container>
      <FirstTitle>
        Taxonomie
        <TitleSpan>{` (${activeObject.name})`}</TitleSpan>
      </FirstTitle>
      <TaxonomyObject objekt={activeObject} />
      {synonymObjects.length > 0 && (
        <Title>
          {synonymObjects.length > 1 ? 'Synonyme' : 'Synonym'}
          <TitleSpan>
            {synonymObjects.length > 1 ? ` (${synonymObjects.length})` : ''}
          </TitleSpan>
        </Title>
      )}
      {sortBy(synonymObjects, tO =>
        get(tO, 'taxonomyByTaxonomyId.name', '(Name fehlt)')
      ).map(objekt => (
        <TaxonomyObject key={objekt.id} objekt={objekt} showLink />
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
        <PropertyCollectionObject
          key={`${pCO.propertyCollectionId}`}
          pCO={pCO}
          relations={relations.filter(
            r => r.propertyCollectionId === pCO.propertyCollectionId
          )}
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
        <PropertyCollectionObject
          key={`${pCO.propertyCollectionId}`}
          pCO={pCO}
          relations={relations.filter(
            r => r.propertyCollectionId === pCO.propertyCollectionId
          )}
        />
      ))}
    </Container>
  )
}

export default enhance(Objekt)
