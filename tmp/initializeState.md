It looks like state is not initialized before it has been queried once, even though `withClientState` provides - according to the readme - initial state.

I can see this in two places:

- unqueried state variables are not shown in apollo dev tool
- when state variables mutations depend on other state variables that have not yet been queried, this error occurs:
  `Unhandled Rejection (Error): Network error: Can't find field exportRcoProperties on object (ROOT_QUERY)`

This is my withClientState function where this error occurs:
```js
export default withClientState({
  Query: {
    // provide initial state
    exportTaxProperties: () => [],
    exportPcoProperties: () => [],
    exportRcoProperties: () => [],
    exportTooManyProperties: () => false,
  },
  Mutation: {
    addExportTaxProperty: (_, { taxname, pname }, { cache }) => {
      const currentTax = cache.readQuery({ query: exportTaxPropertiesGql })
      /**
       * TODO:
       * next call errors with message:
       * Unhandled Rejection (Error): Network error: Can't find field exportRcoProperties on object (ROOT_QUERY)
       **/
      const currentRco = cache.readQuery({ query: exportRcoPropertiesGql })
      const currentPco = cache.readQuery({ query: exportPcoPropertiesGql })
      const nrOfPropertiesExported =
        currentTax.exportTaxProperties.length +
        currentRco.currentRco.exportRcoProperties +
        currentPco.exportPcoProperties
      if (nrOfPropertiesExported > constants.export.maxFields) {
        // TODO: set exportTooManyProperties true
      } else {
        cache.writeQuery({
          query: exportTaxPropertiesGql,
          data: {
            exportTaxProperties: [
              ...currentTax.exportTaxProperties,
              { taxname, pname, __typename: 'ExportTaxProperty' },
            ],
          },
        })
      }
      return null
    },
    addExportPcoProperty: (_, { pcname, pname }, { cache }) => {
      ...similar to addExportTaxProperty
    },
    addExportRcoProperty: (_, { pcname, pname }, { cache }) => {
      ...similar to addExportTaxProperty
    },
  },
})
```

Is this behaviour intended?

It basically means that I have to query all local state at the start of the app to prevent errors.
