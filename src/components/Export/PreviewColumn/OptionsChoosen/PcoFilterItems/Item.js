// @flow
import React, { useCallback, useContext } from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react-lite'

import booleanToJaNein from '../../../../../modules/booleanToJaNein'
import mobxStoreContext from '../../../../../mobxStoreContext'

const FilterValueSpan = styled.span`
  background-color: #dadada;
  padding: 1px 8px;
  margin-left: 5px;
  border-radius: 3px;
`
const ResetSpan = styled.span`
  margin-left: 8px;
  font-weight: 100;
  font-style: italic;
  cursor: pointer;
  text-decoration: underline dotted rgba(0, 0, 0, 0.3);
`

const ExportPcoFilterListItem = ({ filter }: { filter: Object }) => {
  const mobxStore = useContext(mobxStoreContext)
  const { setPcoFilter } = mobxStore.export

  const { pcname, pname, comparator, value } = filter

  const onClick = useCallback(() => {
    setPcoFilter({
      pcname,
      pname,
      comparator: '',
      value: '',
    })
  }, [pcname, pname, setPcoFilter])

  return (
    <li>
      {`${pcname}: ${pname} ${comparator ? `${comparator}` : ''}`}
      <FilterValueSpan>
        {typeof value === 'boolean' ? booleanToJaNein(value) : value}
      </FilterValueSpan>
      <ResetSpan onClick={onClick}>zurücksetzen</ResetSpan>
    </li>
  )
}

export default observer(ExportPcoFilterListItem)
