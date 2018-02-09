// @flow
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

export default graphql(
  gql`
    query rCOQuery(
      $getObjectIds: Boolean!
      $objectIds: [UUID!]
      $getObjectRelationIds: Boolean!
      $objectRelationIds: [UUID!]
      $getPCOfOriginIds: Boolean!
      $pCOfOriginIds: [UUID!]
    ) {
      allObjects(filter: { id: { in: $objectIds } })
        @include(if: $getObjectIds) {
        nodes {
          id
        }
      }
      allObjectRelations: allObjects(
        filter: { id: { in: $objectRelationIds } }
      ) @include(if: $getObjectRelationIds) {
        nodes {
          id
        }
      }
      allPropertyCollections(filter: { id: { in: $pCOfOriginIds } })
        @include(if: $getPCOfOriginIds) {
        nodes {
          id
        }
      }
    }
  `,
  {
    options: ({ objectIds, objectRelationIds, pCOfOriginIds }) => ({
      variables: {
        getObjectIds: objectIds.length > 0,
        objectIds:
          objectIds.length > 0
            ? objectIds
            : ['99999999-9999-9999-9999-999999999999'],
        getObjectRelationIds: objectRelationIds.length > 0,
        objectRelationIds:
          objectRelationIds.length > 0
            ? objectRelationIds
            : ['99999999-9999-9999-9999-999999999999'],
        getPCOfOriginIds: pCOfOriginIds.length > 0,
        pCOfOriginIds:
          pCOfOriginIds.length > 0
            ? pCOfOriginIds
            : ['99999999-9999-9999-9999-999999999999'],
      },
    }),
    name: 'importRcoData',
  }
)
