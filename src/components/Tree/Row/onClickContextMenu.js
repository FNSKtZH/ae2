// @flow
import get from 'lodash/get'
import set from 'lodash/set'
import app from 'ampersand-app'

import createUserMutation from '../../Benutzer/createUserMutation'
import deleteUserMutation from '../../Benutzer/deleteUserMutation'
import createObjectMutation from '../../Objekt/createObjectMutation'
import createRootObjectMutation from '../../Objekt/createRootObjectMutation'
import deleteObjectMutation from '../../Objekt/deleteObjectMutation'
import createTaxonomyMutation from '../../Taxonomy/createTaxonomyMutation'
import createPCMutation from '../../PropertyCollection/createPCMutation'
import deletePCMutation from '../../PropertyCollection/deletePCMutation'
import deleteTaxonomyMutation from '../../Taxonomy/deleteTaxonomyMutation'
import treeDataGql from '../treeDataGql'
import treeDataVariables from '../treeDataVariables'
import editingTaxonomiesMutation from '../../../modules/editingTaxonomiesMutation'
import editingPCsMutation from '../../../modules/editingPCsMutation'

export default async ({
  e,
  data,
  target,
  client,
  treeData,
  rowData,
  editingTaxonomiesData,
  activeNodeArrayData,
}: {
  e: Object,
  data: Object,
  target: Object,
  client: Object,
  treeData: Object,
  rowData: Object,
  editingTaxonomiesData: Object,
  activeNodeArrayData: Object,
}) => {
  const userId = get(rowData, 'userByName.id', null)
  const activeNodeArray = get(activeNodeArrayData, 'activeNodeArray', [])
  const editing = get(editingTaxonomiesData, 'editingTaxonomies', false)
  if (!data) return console.log('no data passed with click')
  if (!target) {
    return console.log('no target passed with click')
  }
  const { table, action } = data
  const id = target.firstElementChild.getAttribute('data-id')
  const url = target.firstElementChild.getAttribute('data-url').split(',')
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
        treeData.refetch()
        !!newUserId && app.history.push(`/Benutzer/${newUserId}`)
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
        app.history.push(`/${[...url, newId].join('/')}`)
        // if not editing, set editing true
        if (!editing) {
          client.mutate({
            mutation: editingTaxonomiesMutation,
            variables: { value: true },
            optimisticResponse: {
              setEditingTaxonomies: {
                editingTaxonomies: true,
                __typename: 'EditingTaxonomies',
              },
              __typename: 'Mutation',
            },
          })
        }
        treeData.refetch()
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
          null
        )
        app.history.push(`/${[...url, newId].join('/')}`)
        // if not editing, set editing true
        if (!editing) {
          client.mutate({
            mutation: editingTaxonomiesMutation,
            variables: { value: true },
            optimisticResponse: {
              setEditingTaxonomies: {
                editingTaxonomies: true,
                __typename: 'EditingTaxonomies',
              },
              __typename: 'Mutation',
            },
          })
        }
        treeData.refetch()
      }
      if (table === 'pc') {
        const newPCData = await client.mutate({
          mutation: createPCMutation,
          variables: { importedBy: userId, lastUpdated: new Date() },
        })
        const newId = get(
          newPCData,
          'data.createPropertyCollection.propertyCollection.id',
          null
        )
        app.history.push(`/${[...url, newId].join('/')}`)
        // if not editing, set editing true
        if (!editing) {
          client.mutate({
            mutation: editingPCsMutation,
            variables: { value: true },
            optimisticResponse: {
              setEditingPCs: {
                editingPCs: true,
                __typename: 'EditingPCs',
              },
              __typename: 'Mutation',
            },
          })
        }
        treeData.refetch()
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
              const variables = treeDataVariables({ activeNodeArray })
              const data = proxy.readQuery({
                query: treeDataGql,
                variables,
              })
              const nodes = get(data, 'allUsers.nodes', []).filter(
                u => u.id !== id
              )
              set(data, 'allUsers.nodes', nodes)
              proxy.writeQuery({
                query: treeDataGql,
                variables,
                data,
              })
            },
          })
        } catch (error) {
          console.log(error)
        }
        treeData.refetch()
        app.history.push('/Benutzer')
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
            const variables = treeDataVariables({ activeNodeArray })
            const data = proxy.readQuery({
              query: treeDataGql,
              variables,
            })
            const nodesPath =
              url.length === 3
                ? `taxonomyObjectLevel1.nodes`
                : `level${url.length}Object.objectsByParentId.nodes`
            const nodes = get(data, nodesPath, []).filter(u => u.id !== id)
            set(data, nodesPath, nodes)
            proxy.writeQuery({
              query: treeDataGql,
              variables,
              data,
            })
          },
        })
        if (url.includes(id)) {
          url.length = url.indexOf(id)
          app.history.push(`/${url.join('/')}`)
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
            const variables = treeDataVariables({ activeNodeArray })
            const data = proxy.readQuery({
              query: treeDataGql,
              variables,
            })
            const nodes = get(data, 'allTaxonomies.nodes', []).filter(
              u => u.id !== id
            )
            set(data, 'allTaxonomies.nodes', nodes)
            proxy.writeQuery({
              query: treeDataGql,
              variables,
              data,
            })
          },
        })
        if (url.includes(id)) {
          url.length = url.indexOf(id)
          app.history.push(`/${url.join('/')}`)
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
            const variables = treeDataVariables({ activeNodeArray })
            const data = proxy.readQuery({
              query: treeDataGql,
              variables,
            })
            const nodes = get(data, 'allPropertyCollections.nodes', []).filter(
              u => u.id !== id
            )
            set(data, 'allPropertyCollections.nodes', nodes)
            proxy.writeQuery({
              query: treeDataGql,
              variables,
              data,
            })
          },
        })
        if (url.includes(id)) {
          url.length = url.indexOf(id)
          app.history.push(`/${url.join('/')}`)
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
