// @flow
import get from 'lodash/get'
import set from 'lodash/set'
import app from 'ampersand-app'

import createUserMutation from '../../Benutzer/createUserMutation'
import deleteUserMutation from '../../Benutzer/deleteUserMutation'
import createObjectMutation from '../../Objekt/createObjectMutation'
import createRootObjectMutation from '../../Objekt/createRootObjectMutation'
import deleteObjectMutation from '../../Objekt/deleteObjectMutation'
import treeDataGql from '../treeDataGql'
import treeDataVariables from '../treeDataVariables'
import editingTaxonomiesMutation from '../../../modules/editingTaxonomiesMutation'

export default async ({
  e,
  data,
  target,
  client,
  treeData,
  editingTaxonomiesData,
  activeNodeArrayData,
}: {
  e: Object,
  data: Object,
  target: Object,
  client: Object,
  treeData: Object,
  editingTaxonomiesData: Object,
  activeNodeArrayData: Object,
}) => {
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
        if (url.length === 3) {
          // user clicke on the taxonomy
          // need to create root level object, without parentId
          newObjectData = await client.mutate({
            mutation: createRootObjectMutation,
            variables: { taxonomyId: url[2] },
          })
        } else {
          newObjectData = await client.mutate({
            mutation: createObjectMutation,
            variables: { taxonomyId: url[2], parentId: id },
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
    },
    delete: async () => {
      if (table === 'user') {
        try {
          await client.mutate({
            mutation: deleteUserMutation,
            variables: { id },
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
            const taxname = `level${url.length}Taxonomy`
            const nodesPath =
              url.length === 3
                ? `${taxname}.taxonomyObjectLevel1.nodes`
                : `${taxname}.objectsByParentId.nodes`
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
            console.log('data before:', data)
            console.log('url:', url)
            const taxname = `level${url.length}Taxonomy`
            console.log('taxname:', taxname)
            const nodes = get(data, `${taxname}.taxonomyById.nodes`, []).filter(
              u => u.id !== id
            )
            console.log('nodes:', nodes)
            set(data, `${taxname}.taxonomyById.nodes`, nodes)
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
