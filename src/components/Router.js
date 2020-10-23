import React, { useEffect, useContext } from 'react'
import { useQuery, gql } from '@apollo/client'
import isUuid from 'is-uuid'
import { navigate } from 'gatsby'
import { observer } from 'mobx-react-lite'

import App from './App'
import getUrlForObject from '../modules/getUrlForObject'
import getUrlParamByName from '../modules/getUrlParamByName'
import mobxStoreContext from '../mobxStoreContext'
import getActiveNodeArrayFromPathname from '../modules/getActiveNodeArrayFromPathname'

const objectQuery = gql`
  query ObjectQuery($id: UUID!, $hasObjectId: Boolean!) {
    objectById(id: $id) @include(if: $hasObjectId) {
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
`

const Router = ({ location }) => {
  const mobxStore = useContext(mobxStoreContext)
  // set activeNodeArray when pathname changes
  const { setActiveNodeArray } = mobxStore
  useEffect(() => {
    setActiveNodeArray(getActiveNodeArrayFromPathname())
  }, [location.pathname, setActiveNodeArray])
  /**
   * check if old url was passed that contains objectId-Param
   * for instance: from artenlistentool like this:
   * /index.html?id=AD0B10AA-707D-42C6-B68D-8F88CCD2F0B3
   */
  const idParam = getUrlParamByName('id')
  const objectId =
    idParam && isUuid.anyNonNil(idParam) ? idParam.toLowerCase() : null
  /**
   * redirect /index.html?exportieren_fuer_artenlistentool=true
   * to /artenlistentool/waehlen
   */
  const altUrlGenParam = getUrlParamByName('exportieren_fuer_artenlistentool')
  if (altUrlGenParam) {
    console.log(
      'Router: redirecting to /artenlistentool/waehlen. objectId:',
      objectId,
    )
    navigate('/artenlistentool/waehlen')
  }

  const hasObjectId = !!objectId
  const { loading, error, data } = useQuery(objectQuery, {
    variables: { id: objectId, hasObjectId },
  })

  if (hasObjectId) {
    if (loading) return 'Loading...'
    if (error) return `Fehler: ${error.message}`
    // if idParam was passed, open object
    const url = getUrlForObject(data.objectById)
    navigate(`/${url.join('/')}`)
    return <App />
  }
  return <App />
}

export default observer(Router)
