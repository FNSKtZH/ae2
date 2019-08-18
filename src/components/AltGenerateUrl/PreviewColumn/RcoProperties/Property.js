import React, { useCallback, useContext } from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react-lite'

import mobxStoreContext from '../../../../mobxStoreContext'

const ResetSpan = styled.span`
  margin-left: 8px;
  font-weight: 100;
  font-style: italic;
  cursor: pointer;
  text-decoration: underline dotted rgba(0, 0, 0, 0.3);
`

const RcoProperty = ({ pcname, relationtype, pname }) => {
  const mobxStore = useContext(mobxStoreContext)
  const { removeRcoProperty } = mobxStore.export

  const onClick = useCallback(() => {
    removeRcoProperty({
      pcname,
      relationtype,
      pname,
    })
  }, [pcname, pname, relationtype, removeRcoProperty])

  return (
    <li>
      {`${pcname} - ${relationtype}: ${pname}`}
      <ResetSpan onClick={onClick}>zurücksetzen</ResetSpan>
    </li>
  )
}

export default observer(RcoProperty)
