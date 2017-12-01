// @flow
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import get from 'lodash/get'

export default graphql(
  gql`
    query objectUrlDataQuery($treeFilterId: Uuid!) {
      objectById(id: $treeFilterId) {
        id
        categoryByCategory {
          id
          name
          dataType
        }
        objectByParentId {
          id
          objectByParentId {
            id
            objectByParentId {
              id
              objectByParentId {
                id
                objectByParentId {
                  id
                  objectByParentId {
                    id
                  }
                }
              }
            }
          }
        }
        taxonomyByTaxonomyId {
          id
        }
      }
    }
  `,
  {
    options: ({ treeFilterData }: { treeFilterData: Object }) => {
      const treeFilterId =
        get(treeFilterData, 'treeFilter.id') ||
        '99999999-9999-9999-9999-999999999999'
      if (treeFilterId !== '99999999-9999-9999-9999-999999999999') {
        console.log('objecturlData: treeFilterId:', treeFilterId)
      }

      return {
        variables: {
          treeFilterId,
        },
      }
    },
    name: 'objectUrlData',
  }
)
