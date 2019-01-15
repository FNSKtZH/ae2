// @flow
import React, { useCallback, useContext } from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react-lite'

import mobxStoreContext from '../../../../../mobxStoreContext'

const ResetSpan = styled.span`
  margin-left: 8px;
  font-weight: 100;
  font-style: italic;
  cursor: pointer;
  text-decoration: underline dotted rgba(0, 0, 0, 0.3);
`

const ExportRcoPropertiesListItem = ({
  properties,
}: {
  properties: Object,
}) => {
  const { pcname, relationtype, pname } = properties
  const mobxStore = useContext(mobxStoreContext)
  const { removeRcoProperty } = mobxStore.export

  const onClick = useCallback(
    () =>
      removeRcoProperty({
        pcname,
        relationtype,
        pname,
      }),
    [properties],
  )

  return (
    <li>
      {`${pcname} - ${relationtype}: ${pname}`}
      <ResetSpan onClick={onClick}>zurücksetzen</ResetSpan>
    </li>
  )
}

export default observer(ExportRcoPropertiesListItem)
