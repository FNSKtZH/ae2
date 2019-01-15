// @flow
import React, { useCallback, useContext } from 'react'
import styled from 'styled-components'

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

const ExportTaxFilterListItem = ({ filter }: { filter: Object }) => {
  const mobxStore = useContext(mobxStoreContext)
  const { setTaxFilters } = mobxStore.export

  const { taxname, pname, comparator, value } = filter
  const onClick = useCallback(
    () =>
      setTaxFilters({
        taxname,
        pname,
        comparator: '',
        value: '',
      }),
    [filter],
  )

  return (
    <li>
      {`${taxname}: ${pname} ${comparator ? `${comparator}` : ''}`}
      <FilterValueSpan>
        {typeof value === 'boolean' ? booleanToJaNein(value) : value}
      </FilterValueSpan>
      <ResetSpan onClick={onClick}>zurücksetzen</ResetSpan>
    </li>
  )
}

export default ExportTaxFilterListItem
