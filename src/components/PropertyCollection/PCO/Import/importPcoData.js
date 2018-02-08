// @flow
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

export default graphql(
  gql`
    query pCOQuery($getObjectIds: Boolean!, $objectIds: [UUID!]) {
      allObjects(filter: { id: { in: $objectIds } })
        @include(if: $getObjectIds) {
        nodes {
          id
        }
      }
    }
  `,
  {
    options: ({ objectIds }) => ({
      variables: {
        getObjectIds: objectIds.length > 0,
        objectIds:
          objectIds.length > 0
            ? objectIds
            : ['99999999-9999-9999-9999-999999999999'],
      },
    }),
    name: 'importPcoData',
  }
)
