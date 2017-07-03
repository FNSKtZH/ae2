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

const Container = styled.div`
  padding: 5px;
  height: calc(100% - 48px);
  overflow: auto !important;
`
const Title = styled.h3`margin: 15px 0 -5px 0;`
const TitleSpan = styled.span`font-weight: normal;`
const FirstTitle = styled(Title)`
  margin: 5px 0 -5px 0;
`

const enhance = compose(inject('store') /*, observer*/)

const Objekt = ({ store }: { store: Object }) => {
  const { activeTaxonomyObject } = store
  const taxonomyObjects = get(
    activeTaxonomyObject,
    'taxonomyObjectsByObjectId.nodes',
    [],
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
  const synonymTaxonomyObjects = synonyms.map(
    s => s.taxonomyObjectByTaxonomyObjectIdSynonym,
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

  return (
    <Container>
      <FirstTitle>
        Taxonomien
        <TitleSpan>{` (${taxonomyObjects.length})`}</TitleSpan>
      </FirstTitle>
      {sortBy(taxonomyObjects, tO =>
        get(tO, 'taxonomyByTaxonomyId.name', '(Name fehlt)'),
      ).map(taxonomyObject =>
        <TaxonomyObject
          key={taxonomyObject.id}
          taxonomyObject={taxonomyObject}
        />,
      )}
      {synonymTaxonomyObjects.length > 0 &&
        <Title>
          Synonyme
          <TitleSpan>{` (${synonymTaxonomyObjects.length})`}</TitleSpan>
        </Title>}
      {sortBy(synonymTaxonomyObjects, tO =>
        get(tO, 'taxonomyByTaxonomyId.name', '(Name fehlt)'),
      ).map(taxonomyObject =>
        <TaxonomyObject
          key={taxonomyObject.id}
          taxonomyObject={taxonomyObject}
          showLink
        />,
      )}
      {propertyCollectionObjects.length > 0 &&
        <Title>
          Eigenschaften
          <TitleSpan
          >{` (${propertyCollectionObjects.length} ${propertyCollectionObjects.length >
            1
            ? 'Sammlungen'
            : 'Sammlung'})`}</TitleSpan>
        </Title>}
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
      {propertyCollectionObjectsOfSynonyms.length > 0 &&
        <Title>
          Eigenschaften von Synonymen
          <TitleSpan>
            {` (${propertyCollectionObjectsOfSynonyms.length} ${propertyCollectionObjectsOfSynonyms.length >
              1
              ? 'Sammlungen'
              : 'Sammlung'})`}
          </TitleSpan>
        </Title>}
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
    </Container>
  )
}

export default enhance(Objekt)
