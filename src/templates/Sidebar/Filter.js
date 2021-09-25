import React, { useCallback, useContext } from 'react'
import Input from '@mui/material/Input'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import InputAdornment from '@mui/material/InputAdornment'
import DeleteFilterIcon from '@mui/icons-material/DeleteSweep'
import styled from 'styled-components'

import storeContext from '../../mobxStoreContext'

const StyledInput = styled(Input)`
  div hr {
    width: calc(100% - 20px) !important;
  }
  &:before {
    border-bottom-color: rgba(0, 0, 0, 0.1) !important;
  }
`
const StyledDeleteFilterIcon = styled(DeleteFilterIcon)`
  cursor: pointer;
  pointer-events: auto;
  padding-top: 5px;
  color: rgba(0, 0, 0, 0.7);
`

const Filter = () => {
  const store = useContext(storeContext)
  const { docFilter, setDocFilter } = store
  const onChange = useCallback(
    (e) => setDocFilter(e.target.value),
    [setDocFilter],
  )
  const onClickEmptyFilter = useCallback(() => setDocFilter(''), [setDocFilter])

  return (
    <FormControl fullWidth variant="standard">
      <InputLabel htmlFor="filterInput">filtern</InputLabel>
      <StyledInput
        id="filterInput"
        value={docFilter}
        onChange={onChange}
        spellCheck="false"
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        endAdornment={
          docFilter ? (
            <InputAdornment
              position="end"
              onClick={onClickEmptyFilter}
              title="Filter entfernen"
            >
              <StyledDeleteFilterIcon />
            </InputAdornment>
          ) : null
        }
      />
    </FormControl>
  )
}

export default Filter
