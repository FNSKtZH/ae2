I _think_ I got it:

localStateLink.js:
```js
export default withClientState({
  Query: {
    treeFilter: () => ({
      text: '',
      id: null,
      __typename: 'TreeFilter',
    }),
  },
  Mutation: {
    setTreeFilter: (_, { id, text }, { cache }) => {
      const treeFilter = { id, text, __typename: 'TreeFilter' }
      cache.writeQuery({
        query: treeFilterGql,
        data: { treeFilter },
      })
      return null
    }
  }
})
```

treeFilterGql.js:
```js
import gql from 'graphql-tag'

export default gql`
  query treeFilterQuery {
    treeFilter @client {
      text @client
      id @client
    }
  }
`
```

treeFilterMutation.js:
```js
import gql from 'graphql-tag'

export default gql`
  mutation setTreeFilter($text: String, $id: UUID) {
    setTreeFilter(text: $text, id: $id) @client
  }
`
```

I'll close the issue but please correct me if there is an error in my solution.