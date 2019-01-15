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

const ExportTaxPropertiesListItem = ({
  properties,
}: {
  properties: Object,
}) => {
  const mobxStore = useContext(mobxStoreContext)
  const { removeTaxProperty } = mobxStore.export

  const { taxname, pname } = properties
  const onClick = useCallback(
    () =>
      removeTaxProperty({
        taxname,
        pname,
      }),
    [properties],
  )

  return (
    <li key={`${taxname}: ${pname}`}>
      {`${taxname}: ${pname}`}
      <ResetSpan onClick={onClick}>zurücksetzen</ResetSpan>
    </li>
  )
}

export default observer(ExportTaxPropertiesListItem)
