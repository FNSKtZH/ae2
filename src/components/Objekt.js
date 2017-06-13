// @flow
import React from 'react'
import { observer, inject } from 'mobx-react'
import compose from 'recompose/compose'
import { createFragmentContainer, graphql } from 'react-relay'

const enhance = compose(inject('store'), observer)

const Objekt = ({ store, data }: { store: Object, data: Object }) => {
  console.log('data:', data)
  return <div>Objekt</div>
}

// export default enhance(Objekt)
export default createFragmentContainer(
  enhance(Objekt),
  graphql`
    fragment Objekt on Object {
      id
      taxonomyObjectsByObjectId {
        totalCount
        nodes {
          taxonomyByTaxonomyId {
            name
            description
            links
            lastUpdated
            organizationByOrganizationId {
              name
            }
          }
          name
        }
      }
      propertyCollectionObjectsByObjectId {
        totalCount
        nodes {
          properties
        }
      }
      relationCollectionObjectsByObjectId {
        totalCount
        nodes {
          relationsByObjectIdAndRelationCollectionId {
            totalCount
            nodes {
              properties
              relationPartnersByRelationId {
                totalCount
                nodes {
                  objectByObjectId {
                    taxonomyObjectsByObjectId {
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
  `
)
