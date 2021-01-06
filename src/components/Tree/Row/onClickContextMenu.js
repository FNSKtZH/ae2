import get from 'lodash/get'
import set from 'lodash/set'
import { navigate } from 'gatsby'

import createUserMutation from '../../Benutzer/createUserMutation'
import deleteUserMutation from '../../Benutzer/deleteUserMutation'
import createObjectMutation from '../../Objekt/createObjectMutation'
import createRootObjectMutation from '../../Objekt/createRootObjectMutation'
import deleteObjectMutation from '../../Objekt/deleteObjectMutation'
import createTaxonomyMutation from '../../Taxonomy/createTaxonomyMutation'
import createPCMutation from '../../PropertyCollection/createPCMutation'
import deletePCMutation from '../../PropertyCollection/deletePCMutation'
import deleteTaxonomyMutation from '../../Taxonomy/deleteTaxonomyMutation'
import treeQuery from '../treeQuery'
import treeQueryVariables from '../treeQueryVariables'

const onClickContextMenu = async ({
  e,
  data,
  target,
  client,
  treeRefetch,
  userId,
  mobxStore,
}) => {
  const { setEditingTaxonomies, setEditingPCs, editingTaxonomies } = mobxStore
  const activeNodeArray = mobxStore.activeNodeArray.toJS()
  if (!data) return console.log('no data passed with click')
  if (!target) {
    return console.log('no target passed with click')
  }
  const { table, action } = data
  const id = target.firstElementChild.getAttribute('data-id')
  const url = target.firstElementChild.getAttribute('data-url').split(',')
  console.log('onClickContextMenu', {
    data,
    table,
    action,
    id,
    url,
    activeNodeArray,
  })
  const actions = {
    insert: async () => {
      if (table === 'user') {
        let newUser
        try {
          newUser = await client.mutate({
            mutation: createUserMutation,
          })
        } catch (error) {
          console.log(error)
        }
        const newUserId = get(newUser, 'data.createUser.user.id')
        treeRefetch()
        !!newUserId && navigate(`/Benutzer/${newUserId}`)
      }
      if (table === 'object') {
        let newObjectData
        if (url.length === 2) {
          // user clicked on the taxonomy
          // need to create root level object, without parentId
          newObjectData = await client.mutate({
            mutation: createRootObjectMutation,
            variables: { taxonomyId: url[1] },
          })
        } else {
          newObjectData = await client.mutate({
            mutation: createObjectMutation,
            variables: { taxonomyId: url[1], parentId: id },
          })
        }
        const newId = get(newObjectData, 'data.createObject.object.id', null)
        navigate(`/${[...url, newId].join('/')}`)
        // if not editing, set editing true
        if (!editingTaxonomies) {
          setEditingTaxonomies(true)
        }
        treeRefetch()
      }
      if (table === 'taxonomy') {
        const typeConverter = {
          Arten: 'ART',
          Lebensräume: 'LEBENSRAUM',
        }
        const newTaxonomyData = await client.mutate({
          mutation: createTaxonomyMutation,
          variables: {
            type: typeConverter[id],
            importedBy: userId,
            lastUpdated: new Date(),
          },
        })
        const newId = get(
          newTaxonomyData,
          'data.createTaxonomy.taxonomy.id',
          null,
        )
        navigate(`/${[...url, newId].join('/')}`)
        // if not editingTaxonomies, set editingTaxonomies true
        if (!editingTaxonomies) {
          setEditingTaxonomies(true)
        }
        treeRefetch()
      }
      if (table === 'pc') {
        const newPCData = await client.mutate({
          mutation: createPCMutation,
          variables: { importedBy: userId, lastUpdated: new Date() },
        })
        const newId = get(
          newPCData,
          'data.createPropertyCollection.propertyCollection.id',
          null,
        )
        navigate(`/${[...url, newId].join('/')}`)
        // if not editing, set editingTaxonomies true
        if (!editingTaxonomies) {
          setEditingPCs(true)
        }
        treeRefetch()
      }
    },
    delete: async () => {
      if (table === 'user') {
        try {
          await client.mutate({
            mutation: deleteUserMutation,
            variables: { id },
            optimisticResponse: {
              deleteUserById: {
                user: {
                  id,
                  __typename: 'User',
                },
                __typename: 'Mutation',
              },
            },
            update: (proxy, { data: { deleteUserMutation } }) => {
              const variables = treeQueryVariables({ activeNodeArray })
              const data = proxy.readQuery({
                query: treeQuery,
                variables,
              })
              const nodes = get(data, 'allUsers.nodes', []).filter(
                (u) => u.id !== id,
              )
              set(data, 'allUsers.nodes', nodes)
              proxy.writeQuery({
                query: treeQuery,
                variables,
                data,
              })
            },
          })
        } catch (error) {
          console.log(error)
        }
        treeRefetch()
        navigate('/Benutzer')
      }
      if (table === 'object') {
        await client.mutate({
          mutation: deleteObjectMutation,
          variables: { id },
          optimisticResponse: {
            deleteObjectById: {
              object: {
                id,
                __typename: 'Object',
              },
              __typename: 'Mutation',
            },
          },
          update: (proxy, { data: { deleteObjectMutation } }) => {
            const variables = treeQueryVariables({ activeNodeArray })
            const data = proxy.readQuery({
              query: treeQuery,
              variables,
            })
            const nodesPath =
              url.length === 3
                ? `level3Object.nodes`
                : url.length === 4
                ? `level3Object.objectsByParentId.nodes`
                : url.length === 5
                ? `level3Object.objectsByParentId.objectsByParentId.nodes`
                : url.length === 6
                ? `level3Object.objectsByParentId.objectsByParentId.objectsByParentId.nodes`
                : url.length === 7
                ? `level3Object.objectsByParentId.objectsByParentId.objectsByParentId.objectsByParentId.nodes`
                : url.length === 8
                ? `level3Object.objectsByParentId.objectsByParentId.objectsByParentId.objectsByParentId.objectsByParentId.nodes`
                : url.length === 9
                ? `level3Object.objectsByParentId.objectsByParentId.objectsByParentId.objectsByParentId.objectsByParentId.objectsByParentId.nodes`
                : url.length === 10
                ? `level3Object.objectsByParentId.objectsByParentId.objectsByParentId.objectsByParentId.objectsByParentId.objectsByParentId.objectsByParentId.nodes`
                : `level3Object.objectsByParentId.objectsByParentId.objectsByParentId.objectsByParentId.objectsByParentId.objectsByParentId.objectsByParentId.objectsByParentId.nodes`
            const nodes = get(data, nodesPath, []).filter((u) => u.id !== id)
            set(data, nodesPath, nodes)
            proxy.writeQuery({
              query: treeQuery,
              variables,
              data,
            })
          },
        })
        if (url.includes(id)) {
          url.length = url.indexOf(id)
          navigate(`/${url.join('/')}`)
        }
      }
      if (table === 'taxonomy') {
        await client.mutate({
          mutation: deleteTaxonomyMutation,
          variables: { id },
          optimisticResponse: {
            deleteTaxonomyById: {
              taxonomy: {
                id,
                __typename: 'Taxonomy',
              },
              __typename: 'Mutation',
            },
          },
          update: (proxy, { data: { deleteTaxonomyMutation } }) => {
            const variables = treeQueryVariables({ activeNodeArray })
            const data = proxy.readQuery({
              query: treeQuery,
              variables,
            })
            // get and set artTaxonomies or lrTaxonomies depending on url
            const type = url[0]
            if (type === 'Arten') {
              const nodes = (data?.artTaxonomies.nodes ?? []).filter(
                (u) => u.id !== id,
              )
              set(data, 'artTaxonomies.nodes', nodes)
            } else {
              const nodes = (data?.lrTaxonomies.nodes ?? []).filter(
                (u) => u.id !== id,
              )
              set(data, 'lrTaxonomies.nodes', nodes)
            }
            proxy.writeQuery({
              query: treeQuery,
              variables,
              data,
            })
          },
        })
        if (url.includes(id)) {
          url.length = url.indexOf(id)
          navigate(`/${url.join('/')}`)
        }
      }
      if (table === 'pc') {
        await client.mutate({
          mutation: deletePCMutation,
          variables: { id },
          optimisticResponse: {
            deletePropertyCollectionById: {
              propertyCollection: {
                id,
                __typename: 'PropertyCollection',
              },
              __typename: 'Mutation',
            },
          },
          update: (proxy, { data: { deletePCMutation } }) => {
            const variables = treeQueryVariables({ activeNodeArray })
            const data = proxy.readQuery({
              query: treeQuery,
              variables,
            })
            const nodes = get(data, 'allPropertyCollections.nodes', []).filter(
              (u) => u.id !== id,
            )
            set(data, 'allPropertyCollections.nodes', nodes)
            proxy.writeQuery({
              query: treeQuery,
              variables,
              data,
            })
          },
        })
        if (url.includes(id)) {
          url.length = url.indexOf(id)
          navigate(`/${url.join('/')}`)
        }
      }
    },
  }
  if (Object.keys(actions).includes(action)) {
    actions[action]()
  } else {
    console.log(`action "${action}" unknown, therefore not executed`)
  }
}

export default onClickContextMenu
