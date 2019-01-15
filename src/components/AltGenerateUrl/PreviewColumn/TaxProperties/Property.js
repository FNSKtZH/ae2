// @flow
import React, { useCallback, useContext } from 'react'
import styled from 'styled-components'

import mobxStoreContext from '../../../../mobxStoreContext'

const ResetSpan = styled.span`
  margin-left: 8px;
  font-weight: 100;
  font-style: italic;
  cursor: pointer;
  text-decoration: underline dotted rgba(0, 0, 0, 0.3);
`

const TaxProperties = ({
  taxname,
  pname,
}: {
  taxname: string,
  pname: string,
}) => {
  const mobxStore = useContext(mobxStoreContext)
  const { removeTaxProperty } = mobxStore.export

  const onClick = useCallback(() =>
    removeTaxProperty({
      taxname,
      pname,
    }),
  )

  return (
    <li>
      {`${taxname}: ${pname}`}
      <ResetSpan onClick={onClick}>zurücksetzen</ResetSpan>
    </li>
  )
}

export default TaxProperties
