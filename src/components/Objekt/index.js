import React, { useContext } from 'react'
import styled from 'styled-components'
import get from 'lodash/get'
import uniqBy from 'lodash/uniqBy'
import { useQuery } from '@apollo/client'
import { observer } from 'mobx-react-lite'
import SimpleBar from 'simplebar-react'
import { withResizeDetector } from 'react-resize-detector'
import { getSnapshot } from 'mobx-state-tree'

import TaxonomyObjects from './TaxonomyObjects'
import TaxonomyObject from './TaxonomyObjects/TaxonomyObject'
import PCOs from './PCOs'
import getActiveObjectIdFromNodeArray from '../../modules/getActiveObjectIdFromNodeArray'
import objectDataQuery from './objectDataQuery'
import mobxStoreContext from '../../mobxStoreContext'
import Spinner from '../shared/Spinner'
import ErrorBoundary from '../shared/ErrorBoundary'

const Container = styled.div`
  height: 100%;
`
const Container2 = styled.div`
  padding: 10px;
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

const Objekt = ({ stacked = false, height }) => {
  const mobxStore = useContext(mobxStoreContext)
  const activeNodeArray = getSnapshot(mobxStore.activeNodeArray)

  const objectId = getActiveObjectIdFromNodeArray(activeNodeArray)
  const {
    data: objectData,
    loading: objectLoading,
    error: objectError,
  } = useQuery(objectDataQuery, {
    variables: {
      objectId,
    },
  })

  const objekt = get(objectData, 'objectById')
  if (!objekt) return <div />
  const propertyCollectionObjects = get(
    objekt,
    'propertyCollectionObjectsByObjectId.nodes',
    [],
  )
  const relations = get(objekt, 'relationsByObjectId.nodes', [])
  const synonyms = get(objekt, 'synonymsByObjectId.nodes', [])
  const synonymObjects = synonyms.map((s) => s.objectByObjectIdSynonym)
  const propertyCollectionIds = propertyCollectionObjects.map(
    (pco) => pco.propertyCollectionId,
  )
  let propertyCollectionObjectsOfSynonyms = []
  synonymObjects.forEach((synonym) => {
    propertyCollectionObjectsOfSynonyms = [
      ...propertyCollectionObjectsOfSynonyms,
      ...get(synonym, 'propertyCollectionObjectsByObjectId.nodes', []),
    ]
  })
  propertyCollectionObjectsOfSynonyms = uniqBy(
    propertyCollectionObjectsOfSynonyms,
    (pco) => pco.propertyCollectionId,
  )
  propertyCollectionObjectsOfSynonyms = propertyCollectionObjectsOfSynonyms.filter(
    (pco) => !propertyCollectionIds.includes(pco.propertyCollectionId),
  )

  if (objectLoading) return <Spinner />
  if (objectError) {
    return <Container2>{`Fehler: ${objectError.message}`}</Container2>
  }

  return (
    <ErrorBoundary>
      <Container>
        <SimpleBar style={{ maxHeight: height }}>
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
        </SimpleBar>
      </Container>
    </ErrorBoundary>
  )
}

export default withResizeDetector(observer(Objekt))
