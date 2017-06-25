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
  const taxonomyObjects = get(
    activeTaxonomyObject,
    'taxonomyObjectsByObjectId.nodes',
    []
  )
  const propertyCollectionObjects = toJS(
    get(activeTaxonomyObject, 'propertyCollectionObjectsByObjectId.nodes', [])
  )
  const synonyms = toJS(
    get(
      activeTaxonomyObject,
      'taxonomyObjectsByObjectId.nodes[0].synonymsByTaxonomyObjectId.nodes',
      []
    )
  )

  const synonymTaxonomyObjects = synonyms.map(
    s => s.taxonomyObjectByTaxonomyObjectIdSynonym
  )
  const propertyCollectionIds = propertyCollectionObjects.map(
    pco => pco.propertyCollectionId
  )
  let propertyCollectionObjectsOfSynonyms = []
  synonyms.forEach(synonym => {
    const pco = get(
      synonym,
      'taxonomyObjectByTaxonomyObjectIdSynonym.objectByObjectId.propertyCollectionObjectsByObjectId.nodes',
      []
    )
    propertyCollectionObjectsOfSynonyms = [
      ...propertyCollectionObjectsOfSynonyms,
      ...pco,
    ]
  })
  propertyCollectionObjectsOfSynonyms = uniqBy(
    propertyCollectionObjectsOfSynonyms,
    pco => pco.propertyCollectionId
  )
  propertyCollectionObjectsOfSynonyms = propertyCollectionObjectsOfSynonyms.filter(
    pco => !propertyCollectionIds.includes(pco.propertyCollectionId)
  )
  const relationCollectionObjects = toJS(
    get(activeTaxonomyObject, 'relationCollectionObjectsByObjectId.nodes', [])
  )
  const rCOsTaxonomic = relationCollectionObjects.filter(rco =>
    get(rco, 'relationCollectionByRelationCollectionId.taxonomic')
  )
  const rCOs = relationCollectionObjects.filter(
    rco => !get(rco, 'relationCollectionByRelationCollectionId.taxonomic')
  )
  const relationCollectionIds = relationCollectionObjects.map(
    rco => rco.relationCollectionId
  )
  let relationCollectionObjectsOfSynonyms = []
  synonyms.forEach(synonym => {
    const rco = get(
      synonym,
      'taxonomyObjectByTaxonomyObjectIdSynonym.objectByObjectId.relationCollectionObjectsByObjectId.nodes',
      []
    )
    relationCollectionObjectsOfSynonyms = [
      ...relationCollectionObjectsOfSynonyms,
      ...rco,
    ]
  })
  relationCollectionObjectsOfSynonyms = uniqBy(
    relationCollectionObjectsOfSynonyms,
    'relationCollectionId'
  )
  relationCollectionObjectsOfSynonyms = relationCollectionObjectsOfSynonyms.filter(
    rco => !relationCollectionIds.includes(rco.relationCollectionId)
  )
  relationCollectionObjectsOfSynonyms = relationCollectionObjectsOfSynonyms.filter(
    rco => !get(rco, 'relationCollectionByRelationCollectionId.taxonomic')
  )

  return (
    <Container>
      <FirstTitle>{`Taxonomien (${taxonomyObjects.length})`}</FirstTitle>
      {sortBy(taxonomyObjects, tO =>
        get(tO, 'taxonomyByTaxonomyId.name', '(Name fehlt)')
      ).map(taxonomyObject =>
        <TaxonomyObject
          key={taxonomyObject.id}
          taxonomyObject={taxonomyObject}
        />
      )}
      {synonymTaxonomyObjects.length > 0 &&
        <Title>{`Synonyme (${synonymTaxonomyObjects.length})`}</Title>}
      {sortBy(synonymTaxonomyObjects, tO =>
        get(tO, 'taxonomyByTaxonomyId.name', '(Name fehlt)')
      ).map(taxonomyObject =>
        <TaxonomyObject
          key={taxonomyObject.id}
          taxonomyObject={taxonomyObject}
        />
      )}
      {rCOsTaxonomic.length > 0 &&
        <Title>{`Taxonomische Beziehungen (${rCOsTaxonomic.length})`}</Title>}
      {sortBy(rCOsTaxonomic, rCO =>
        get(
          rCO,
          'relationCollectionByRelationCollectionId.name',
          '(Name fehlt)'
        )
      ).map((rCO, index) =>
        <RelationCollectionObject
          key={`${rCO.relationCollectionId}`}
          rCO={rCO}
        />
      )}
      {propertyCollectionObjects.length > 0 &&
        <Title>{`Eigenschaften (${propertyCollectionObjects.length})`}</Title>}
      {sortBy(propertyCollectionObjects, pCO =>
        get(
          pCO,
          'propertyCollectionByPropertyCollectionId.name',
          '(Name fehlt)'
        )
      ).map((pCO, index) =>
        <PropertyCollectionObject
          key={`${pCO.propertyCollectionId}`}
          pCO={pCO}
        />
      )}
      {propertyCollectionObjectsOfSynonyms.length > 0 &&
        <Title
        >{`Eigenschaften von Synonymen (${propertyCollectionObjectsOfSynonyms.length})`}</Title>}
      {sortBy(propertyCollectionObjectsOfSynonyms, pCO =>
        get(
          pCO,
          'propertyCollectionByPropertyCollectionId.name',
          '(Name fehlt)'
        )
      ).map((pCO, index) =>
        <PropertyCollectionObject
          key={`${pCO.propertyCollectionId}`}
          pCO={pCO}
        />
      )}
      {rCOs.length > 0 && <Title>{`Beziehungen (${rCOs.length})`}</Title>}
      {sortBy(rCOs, rCO =>
        get(
          rCO,
          'relationCollectionByRelationCollectionId.name',
          '(Name fehlt)'
        )
      ).map((rCO, index) =>
        <RelationCollectionObject
          key={`${rCO.relationCollectionId}`}
          rCO={rCO}
        />
      )}
      {relationCollectionObjectsOfSynonyms.length > 0 &&
        <Title
        >{`Beziehungen von Synonymen (${relationCollectionObjectsOfSynonyms.length})`}</Title>}
      {sortBy(relationCollectionObjectsOfSynonyms, rCO =>
        get(
          rCO,
          'relationCollectionByRelationCollectionId.name',
          '(Name fehlt)'
        )
      ).map((rCO, index) =>
        <RelationCollectionObject
          key={`${rCO.relationCollectionId}`}
          rCO={rCO}
        />
      )}
    </Container>
  )
}

export default enhance(Objekt)
