// @flow
import React, { useCallback } from 'react'
import styled from 'styled-components'
import { useApolloClient } from 'react-apollo-hooks'

import removeExportRcoPropertyMutation from '../../removeExportRcoPropertyMutation'

const ResetSpan = styled.span`
  margin-left: 8px;
  font-weight: 100;
  font-style: italic;
  cursor: pointer;
  text-decoration: underline dotted rgba(0, 0, 0, 0.3);
`

const RcoProperty = ({
  pcname,
  relationtype,
  pname,
}: {
  pcname: string,
  relationtype: string,
  pname: string,
}) => {
  const client = useApolloClient()
  const onClick = useCallback(() =>
    client.mutate({
      mutation: removeExportRcoPropertyMutation,
      variables: {
        pcname,
        relationtype,
        pname,
      },
    }),
  )

  return (
    <li>
      {`${pcname} - ${relationtype}: ${pname}`}
      <ResetSpan onClick={onClick}>zurücksetzen</ResetSpan>
    </li>
  )
}

export default RcoProperty
