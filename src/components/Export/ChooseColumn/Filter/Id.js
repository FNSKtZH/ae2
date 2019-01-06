//@flow
import React, { useCallback, useState } from 'react'
import TextField from '@material-ui/core/TextField'
import styled from 'styled-components'
import debounce from 'lodash/debounce'
import { useApolloClient } from 'react-apollo-hooks'

import exportIdsMutation from '../../exportIdsMutation'

const IdField = styled(TextField)`
  margin-top: 2px !important;
`

const IdFilterField = () => {
  const client = useApolloClient()
  const [value, setValue] = useState('')

  const change = useCallback(
    debounce(value => {
      client.mutate({
        mutation: exportIdsMutation,
        variables: {
          value,
        },
      })
    }, 200),
  )

  const handleChange = useCallback(event => {
    const { value } = event.target
    setValue(value)
    // convert values into an array of values, separated by commas
    const valueForStore = value ? JSON.parse(`"[${event.target.value}]"`) : []
    change(valueForStore)
  })

  return (
    <IdField
      id="id"
      label="id"
      multiline
      rowsMax="5"
      value={value}
      onChange={handleChange}
      margin="normal"
      fullWidth
      helperText="Sie können mehrere id's kommagetrennt einfügen"
      autoComplete="off"
      autoCorrect="off"
      autoCapitalize="off"
      spellCheck="false"
    />
  )
}

export default IdFilterField
