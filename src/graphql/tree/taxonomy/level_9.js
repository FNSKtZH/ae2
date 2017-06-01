// @flow

export default `
  {
    allDataTypes {
      nodes {
        nameGerman
        propertyCollectionsByDataType {
          totalCount
        }
        relationCollectionsByDataType {
          totalCount
        }
        categoriesByDataType {
          totalCount
          nodes {
            id
            name
            taxonomiesByCategory {
              totalCount
              nodes {
                id
                name
                isCategoryStandard
                taxonomyObjectsByTaxonomyId(condition: {level: 1, taxonomyId: "5444e7eb-177f-4faf-ba44-0e3da1b391e0"}) {
                  totalCount
                  nodes {
                    id
                    name
                    taxonomyObjectsByParentId(condition: {parentId: "5f8f6fac-fe63-49c5-a143-f2e6e2174602"}) {
                      totalCount
                      nodes {
                        id
                        name
                        taxonomyObjectsByParentId(condition: {parentId: "75839957-4706-40d6-bf72-7ad13906ab5f"}) {
                          totalCount
                          nodes {
                            id
                            name
                            taxonomyObjectsByParentId(condition: {parentId: "a011dc29-dc05-4540-a791-1a4976905290"}) {
                              totalCount
                              nodes {
                                id
                                name
                                taxonomyObjectsByParentId(condition: {parentId: "310212c8-2f89-43c5-9db8-d3c3f6ca8b0b"}) {
                                  totalCount
                                  nodes {
                                    id
                                    name
                                    taxonomyObjectsByParentId(condition: {parentId: "310212c8-2f89-43c5-9db8-d3c3f6ca8b0b"}) {
                                      totalCount
                                      nodes {
                                        id
                                        name
                                        taxonomyObjectsByParentId(condition: {parentId: "310212c8-2f89-43c5-9db8-d3c3f6ca8b0b"}) {
                                          totalCount
                                          nodes {
                                            id
                                            name
                                            taxonomyObjectsByParentId {
                                              totalCount
                                              nodes {
                                                id
                                                name
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`
