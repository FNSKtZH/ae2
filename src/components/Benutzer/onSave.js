// @flow
/**
 * for unknown reason prettier breaks if async function
 * is built directly in class
 * that is why this is modularized
 */
import get from 'lodash/get'

import updateUserMutation from './updateUserMutation'

export default async ({
  props,
  state,
  setState,
}: {
  props: Object,
  state: Object,
  setState: () => void,
}) => {
  const { name: username, email } = state
  const { userData, client } = props
  const id = get(userData, 'userById.id')
  try {
    await client.mutate({
      mutation: updateUserMutation,
      variables: {
        username,
        email,
        id,
      },
    })
  } catch (error) {
    const messages = error.graphQLErrors.map(x => x.message)
    const isNamePassError =
      messages.includes('invalid user or password') ||
      messages.includes('permission denied for relation user')
    if (isNamePassError) {
      const message = 'Name oder Passwort nicht bekannt'
      return this.setState({
        nameErrorText: message,
        passErrorText: message,
      })
    }
    return console.log(error)
  }
  // refetch to update
  userData.refetch()
}
