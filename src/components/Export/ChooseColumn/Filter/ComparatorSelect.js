//@flow
import React from 'react'
import Input from '@material-ui/core/Input'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import styled from 'styled-components'

const StyledSelect = styled(Select)`
  > div {
    padding-left: 8px;
  }
`
const MenuItemRow = styled.div`
  display: flex;
`
const Value = styled.span`
  flex-basis: 85px;
  flex-shrink: 0;
`
const Comment = styled.span`
  font-size: 0.7em;
`

const ComparatorSelect = ({
  comparator,
  onChange,
  classes,
}: {
  comparator: String,
  onChange: () => {},
  classes: Object,
}) => {
  return (
    <StyledSelect
      value={comparator}
      onChange={onChange}
      input={<Input id="v-op" />}
    >
      <MenuItem value="ILIKE">
        <MenuItemRow>
          <Value>enthalten</Value><Comment>Gross-Schreibung ignoriert</Comment>
        </MenuItemRow>
      </MenuItem>
      <MenuItem value="LIKE">
        <MenuItemRow>
          <Value>enthalten</Value><Comment>Gross-Schreibung berücksichtigt</Comment>
        </MenuItemRow>
      </MenuItem>
      <MenuItem value="=">
        <MenuItemRow>
          <Value>&#61;</Value><Comment>genau gleich</Comment>
        </MenuItemRow>
      </MenuItem>
      <MenuItem value=">">
        <MenuItemRow>
          <Value>&#62;</Value><Comment>(Zahlen wie Text sortiert)</Comment>
        </MenuItemRow>
      </MenuItem>
      <MenuItem value=">=">
        <MenuItemRow>
          <Value>&#62;&#61;</Value><Comment>(Zahlen wie Text sortiert)</Comment>
        </MenuItemRow>
      </MenuItem>
      <MenuItem value="<">
        <MenuItemRow>
          <Value>&#60;</Value><Comment>(Zahlen wie Text sortiert)</Comment>
        </MenuItemRow>
      </MenuItem>
      <MenuItem value="<=">
        <MenuItemRow>
          <Value>&#60;&#61;</Value><Comment>(Zahlen wie Text sortiert)</Comment>
        </MenuItemRow>
      </MenuItem>
    </StyledSelect>
  )
}

export default ComparatorSelect
