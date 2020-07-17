import React, { useCallback, useState, useContext } from 'react'
import TextField from '@material-ui/core/TextField'
import styled from 'styled-components'
import { observer } from 'mobx-react-lite'

import mobxStoreContext from '../../../../mobxStoreContext'

const IdField = styled(TextField)`
  margin-top: 2px !important;
`

const IdFilterField = () => {
  const mobxStore = useContext(mobxStoreContext)
  const { setIds } = mobxStore.export

  const [value, setValue] = useState('')

  const handleChange = useCallback(
    (event) => {
      const { value } = event.target
      setValue(value)
      // convert values into an array of values, separated by commas
      //const valueForStore = value ? JSON.parse(`"[${event.target.value}]"`) : []
      const valueForStore = value
        ? event.target.value.replace(/\s/g, '').split(',')
        : []
      setIds(valueForStore)
    },
    [setIds],
  )

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

export default observer(IdFilterField)
