// @flow
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

const Property = ({ pcname, pname }: { pcname: string, pname: string }) => {
  const mobxStore = useContext(mobxStoreContext)
  const { removePcoProperty } = mobxStore.export

  const onClick = useCallback(() =>
    removePcoProperty({
      pcname,
      pname,
    }),
  )

  return (
    <li>
      {`${pcname}: ${pname}`}
      <ResetSpan onClick={onClick}>zurücksetzen</ResetSpan>
    </li>
  )
}

export default observer(Property)
