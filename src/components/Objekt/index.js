// @flow
import React from 'react'
import { toJS } from 'mobx'
import { /*observer,*/ inject } from 'mobx-react'
import compose from 'recompose/compose'
import styled from 'styled-components'
import get from 'lodash/get'
import sortBy from 'lodash/sortBy'
import uniqBy from 'lodash/uniqBy'

import TaxonomyObject from './TaxonomyObject'
import PropertyCollectionObject from './PropertyCollectionObject'
import RelationCollectionObject from './RelationCollectionObject'

const Container = styled.div`
  padding: 5px;
  height: calc(100% - 48px);
  overflow: auto !important;
`
const Title = styled.h3`
  margin: 15px 0 -5px 0;
`
const FirstTitle = styled(Title)`
  margin: 5px 0 -5px 0;
`

const enhance = compose(inject('store') /*, observer*/)

const Objekt = ({ store }: { store: Object }) => {
  const { activeTaxonomyObject } = store
  const taxCount = get(
    activeTaxonomyObject,
    'taxonomyObjectsByObjectId.totalCount',
    0,
  )
  const taxonomyObjects = get(
    activeTaxonomyObject,
    'taxonomyObjectsByObjectId.nodes',
    [],
  )
  const pcCount = get(
    activeTaxonomyObject,
    'propertyCollectionObjectsByObjectId.totalCount',
    0,
  )
  const propertyCollectionObjects = toJS(
    get(activeTaxonomyObject, 'propertyCollectionObjectsByObjectId.nodes', []),
  )
  const synonyms = toJS(
    get(
      activeTaxonomyObject,
      'taxonomyObjectsByObjectId.nodes[0].synonymsByTaxonomyObjectId.nodes',
      [],
    ),
  )
  const propertyCollectionIds = propertyCollectionObjects.map(
    pco => pco.propertyCollectionId,
  )
  let propertyCollectionObjectsOfSynonyms = []
  synonyms.forEach(synonym => {
    const pco = get(
      synonym,
      'taxonomyObjectByTaxonomyObjectIdSynonym.objectByObjectId.propertyCollectionObjectsByObjectId.nodes',
      [],
    )
    propertyCollectionObjectsOfSynonyms = [
      ...propertyCollectionObjectsOfSynonyms,
      ...pco,
    ]
  })
  propertyCollectionObjectsOfSynonyms = uniqBy(
    propertyCollectionObjectsOfSynonyms,
    pco => pco.propertyCollectionId,
  )
  propertyCollectionObjectsOfSynonyms = propertyCollectionObjectsOfSynonyms.filter(
    pco => !propertyCollectionIds.includes(pco.propertyCollectionId),
  )
  const rcCount = get(
    activeTaxonomyObject,
    'relationCollectionObjectsByObjectId.totalCount',
    0,
  )
  const relationCollectionObjects = toJS(
    get(activeTaxonomyObject, 'relationCollectionObjectsByObjectId.nodes', []),
  )
  const relationCollectionIds = relationCollectionObjects.map(
    rco => rco.relationCollectionId,
  )
  let relationCollectionObjectsOfSynonyms = []
  synonyms.forEach(synonym => {
    const rco = get(
      synonym,
      'taxonomyObjectByTaxonomyObjectIdSynonym.objectByObjectId.relationCollectionObjectsByObjectId.nodes',
      [],
    )
    relationCollectionObjectsOfSynonyms = [
      ...relationCollectionObjectsOfSynonyms,
      ...rco,
    ]
  })
  relationCollectionObjectsOfSynonyms = uniqBy(
    relationCollectionObjectsOfSynonyms,
    'relationCollectionId',
  )
  relationCollectionObjectsOfSynonyms = relationCollectionObjectsOfSynonyms.filter(
    rco => !relationCollectionIds.includes(rco.relationCollectionId),
  )

  return (
    <Container>
      <FirstTitle>{`Taxonomien (${taxCount})`}</FirstTitle>
      {sortBy(taxonomyObjects, tO =>
        get(tO, 'taxonomyByTaxonomyId.name', '(Name fehlt)'),
      ).map(taxonomyObject =>
        <TaxonomyObject
          key={taxonomyObject.id}
          taxonomyObject={taxonomyObject}
        />,
      )}
      <Title>{`Eigenschaften-Sammlungen (${pcCount})`}</Title>
      {sortBy(propertyCollectionObjects, pCO =>
        get(
          pCO,
          'propertyCollectionByPropertyCollectionId.name',
          '(Name fehlt)',
        ),
      ).map((pCO, index) =>
        <PropertyCollectionObject
          key={`${pCO.propertyCollectionId}`}
          pCO={pCO}
        />,
      )}
      <Title
      >{`Eigenschaften-Sammlungen von Synonymen (${propertyCollectionObjectsOfSynonyms.length})`}</Title>
      {sortBy(propertyCollectionObjectsOfSynonyms, pCO =>
        get(
          pCO,
          'propertyCollectionByPropertyCollectionId.name',
          '(Name fehlt)',
        ),
      ).map((pCO, index) =>
        <PropertyCollectionObject
          key={`${pCO.propertyCollectionId}`}
          pCO={pCO}
        />,
      )}
      <Title>{`Beziehungs-Sammlungen (${rcCount})`}</Title>
      {sortBy(relationCollectionObjects, rCO =>
        get(
          rCO,
          'relationCollectionByRelationCollectionId.name',
          '(Name fehlt)',
        ),
      ).map((rCO, index) =>
        <RelationCollectionObject
          key={`${rCO.relationCollectionId}`}
          rCO={rCO}
        />,
      )}
      <Title
      >{`Beziehungs-Sammlungen von Synonymen (${relationCollectionObjectsOfSynonyms.length})`}</Title>
      {sortBy(relationCollectionObjectsOfSynonyms, rCO =>
        get(
          rCO,
          'relationCollectionByRelationCollectionId.name',
          '(Name fehlt)',
        ),
      ).map((rCO, index) =>
        <RelationCollectionObject
          key={`${rCO.relationCollectionId}`}
          rCO={rCO}
        />,
      )}
    </Container>
  )
}

export default enhance(Objekt)
