// @flow
import React, { useCallback } from 'react'
import styled from 'styled-components'
import { useApolloClient } from 'react-apollo-hooks'

import removeExportPcoPropertyMutation from '../../removeExportPcoPropertyMutation'

const ResetSpan = styled.span`
  margin-left: 8px;
  font-weight: 100;
  font-style: italic;
  cursor: pointer;
  text-decoration: underline dotted rgba(0, 0, 0, 0.3);
`

const Property = ({ pcname, pname }: { pcname: string, pname: string }) => {
  const client = useApolloClient()
  const onClick = useCallback(() =>
    client.mutate({
      mutation: removeExportPcoPropertyMutation,
      variables: {
        pcname,
        pname,
      },
    }),
  )

  return (
    <li>
      {`${pcname}: ${pname}`}
      <ResetSpan onClick={onClick}>zurücksetzen</ResetSpan>
    </li>
  )
}

export default Property
