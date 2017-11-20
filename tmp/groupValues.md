Now that I have learned how to create single state values (https://github.com/apollographql/apollo-link-state/issues/10) I would like to take this one step further: group values to organize local state better.

I imagine something like this:

localStateLink.js:
```js
export default withClientState({
  Query: {
    // I really don't know how to do this
    // but let's just try something:
    treeFilter: () => ({
      text: () => '',
      id: () => null,
    }),
  },
  Mutation: {
    // how?
})
```

...instead of:
```js
export default withClientState({
  Query: {
    treeFilterText: () => '',
    treeFilterId: () => null,
  },
  Mutation: {
    setTreeFilterText: (_, { value }, { cache }) => {
      cache.writeQuery({
        query: gql`
        query treeFilterTextQuery {
            treeFilterText @client
        }
        `,
        data: { treeFilterText: value },
      })
      return null
    },
    setTreeFilterId: (_, { value }, { cache }) => {
      cache.writeQuery({
        query: gql`
        query treeFilterIdQuery {
            treeFilterId @client
        }
        `,
        data: { treeFilterId: value },
      })
      return null
    },
})
```

How could this be done?