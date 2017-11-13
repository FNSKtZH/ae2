// @flow
import React from 'react'
import styled from 'styled-components'
import get from 'lodash/get'
import sortBy from 'lodash/sortBy'
import uniqBy from 'lodash/uniqBy'
import gql from 'graphql-tag'
import { withApollo } from 'react-apollo'

import TaxonomyObject from './TaxonomyObject'
import PropertyCollectionObject from './PropertyCollectionObject'

const Container = styled.div`
  padding: 5px;
  height: calc(100% - 48px);
  overflow: auto !important;
`
const Title = styled.h3`margin: 15px 0 -5px 0;`
const TitleSpan = styled.span`font-weight: normal;`
const FirstTitle = styled(Title)`margin: 5px 0 -5px 0;`

const Objekt = ({
  activeObject,
  client,
}: {
  activeObject: Object,
  client: Object,
}) => {
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
  /*
  console.log('Objekt: client:', client)

  const query = gql`
    query activeObjects {
      activeObjects @client {
        id
      }
    }
  `
  
  client
    .query({ query })
    .then(value => console.log('Objekt: value before mutating:', value))

  const mutation = gql`
    mutation setActiveObject($id: String) {
      setActiveObject(id: $id) @client
    }
  `
  client.mutate({
    mutation,
    variables: { id: activeObject.id },
  })

  client
    .query({ query })
    .then(value => console.log('Objekt: value after mutating:', value))*/

  return (
    <Container>
      <FirstTitle>
        Taxonomie
        <TitleSpan>{` (${activeObject.name})`}</TitleSpan>
      </FirstTitle>
      <TaxonomyObject key={activeObject.id} taxonomyObject={activeObject} />
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
      ).map(taxonomyObject => (
        <TaxonomyObject
          key={taxonomyObject.id}
          taxonomyObject={taxonomyObject}
          showLink
        />
      ))}
      {propertyCollectionObjects.length > 0 && (
        <Title>
          Eigenschaften
          <TitleSpan
          >{` (${propertyCollectionObjects.length} ${propertyCollectionObjects.length >
          1
            ? 'Sammlungen'
            : 'Sammlung'})`}</TitleSpan>
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
            {` (${propertyCollectionObjectsOfSynonyms.length} ${propertyCollectionObjectsOfSynonyms.length >
            1
              ? 'Sammlungen'
              : 'Sammlung'})`}
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

Objekt.fragments = {
  objekt: gql`
    fragment ActiveObjekt on Object {
      id
      taxonomyId
      parentId
      name
      properties
      category
      idOld
      synonymsByObjectId {
        totalCount
        nodes {
          objectId
          objectIdSynonym
          objectByObjectIdSynonym {
            id
            taxonomyId
            parentId
            name
            properties
            category
            idOld
            taxonomyByTaxonomyId {
              id
              name
              description
              links
              lastUpdated
              isCategoryStandard
              importedBy
              termsOfUse
              habitatLabel
              habitatComments
              habitatNrFnsMin
              habitatNrFnsMax
              organizationByOrganizationId {
                id
                name
              }
            }
            propertyCollectionObjectsByObjectId {
              totalCount
              nodes {
                id
                objectId
                propertyCollectionId
                properties
                propertyCollectionByPropertyCollectionId {
                  id
                  name
                  description
                  links
                  combining
                  lastUpdated
                  termsOfUse
                  importedBy
                  organizationByOrganizationId {
                    id
                    name
                  }
                  userByImportedBy {
                    id
                    name
                    email
                  }
                }
              }
            }
            relationsByObjectId {
              totalCount
              nodes {
                id
                propertyCollectionId
                objectId
                objectIdRelation
                relationType
                properties
                propertyCollectionByPropertyCollectionId {
                  id
                  name
                  description
                  links
                  combining
                  lastUpdated
                  termsOfUse
                  importedBy
                  organizationByOrganizationId {
                    id
                    name
                  }
                  userByImportedBy {
                    id
                    name
                    email
                  }
                }
                objectByObjectIdRelation {
                  id
                  name
                  category
                }
              }
            }
          }
        }
      }
      taxonomyByTaxonomyId {
        id
        name
        description
        links
        lastUpdated
        isCategoryStandard
        importedBy
        termsOfUse
        habitatLabel
        habitatComments
        habitatNrFnsMin
        habitatNrFnsMax
        organizationByOrganizationId {
          id
          name
        }
      }
      propertyCollectionObjectsByObjectId {
        totalCount
        nodes {
          id
          objectId
          propertyCollectionId
          properties
          propertyCollectionByPropertyCollectionId {
            id
            name
            description
            links
            combining
            lastUpdated
            termsOfUse
            importedBy
            organizationByOrganizationId {
              id
              name
            }
            userByImportedBy {
              id
              name
              email
            }
          }
        }
      }
      relationsByObjectId {
        totalCount
        nodes {
          id
          propertyCollectionId
          objectId
          objectIdRelation
          relationType
          properties
          propertyCollectionByPropertyCollectionId {
            name
            description
            links
            combining
            lastUpdated
            termsOfUse
            importedBy
            organizationByOrganizationId {
              id
              name
            }
            userByImportedBy {
              id
              name
              email
            }
          }
          objectByObjectIdRelation {
            id
            name
            category
          }
        }
      }
    }
  `,
}

export default withApollo(Objekt)
