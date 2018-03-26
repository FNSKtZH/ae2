// @flow
import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import isUuid from 'is-uuid'
import app from 'ampersand-app'

import App from './App'
import getUrlForObject from '../modules/getUrlForObject'
import getUrlParamByName from '../modules/getUrlParamByName'

const Router = () => {
  /**
   * check if old url was passed that contains objectId-Param
   * for instance: from artenlistentool like this:
   * /index.html?id=AD0B10AA-707D-42C6-B68D-8F88CCD2F0B3
   */
  const idParam = getUrlParamByName('id')
  const objectId =
    idParam && isUuid.anyNonNil(idParam) ? idParam.toLowerCase() : null
  /**
   * redirect
   * /index.html?exportieren_fuer_artenlistentool=true
   * to
   * /artenlistentool/waehlen
   */
  const altUrlGenParam = getUrlParamByName('exportieren_fuer_artenlistentool')
  if (altUrlGenParam) {
    app.history.push('/artenlistentool/waehlen')
  }

  if (!!objectId) {
    return (
      <Query
        query={gql`
          query ObjectQuery($id: UUID!) {
            objectById(id: $id) {
              id
              taxonomyByTaxonomyId {
                id
                type
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
                  }
                }
              }
            }
          }
        `}
        variables={{ id: objectId }}
      >
        {({ loading, error, data: { objectById } }) => {
          if (loading) return 'Loading...'
          if (error) return `Fehler: ${error.message}`
          // if idParam was passed, open object
          const url = getUrlForObject(objectById)
          app.history.push(`/${url.join('/')}`)
          return <App />
        }}
      </Query>
    )
  }
  return <App />
}

export default Router
