// @flow
import { withClientState } from 'apollo-link-state'
import gql from 'graphql-tag'

const query = gql`
  query ActiveObjectsQuery {
    activeobjects @client {
      id
      taxonomyId
      parentId
      name
      properties
      category
      idOld
    }
  }
`

export default withClientState({
  Query: {
    // provide initial state
    activeObjects: () => [],
  },
  Mutation: {
    // update values in the store on mutations
    setActiveObject: (
      _,
      { id, taxonomyId, parentId, name, properties, category, idOld },
      { cache }
    ) => {
      const data = {
        activeobjects: [
          {
            id,
            taxonomyId,
            parentId,
            name,
            properties,
            category,
            idOld,
            __typename: 'activeObject',
          },
        ],
      }
      cache.writeQuery({ query, data })
      return null
    },
  },
})
