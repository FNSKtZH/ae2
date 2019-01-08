// @flow
import React, { useCallback } from 'react'
import styled from 'styled-components'
import { useApolloClient } from 'react-apollo-hooks'

import removeExportPcoPropertyMutation from '../../../removeExportPcoPropertyMutation'

const ResetSpan = styled.span`
  margin-left: 8px;
  font-weight: 100;
  font-style: italic;
  cursor: pointer;
  text-decoration: underline dotted rgba(0, 0, 0, 0.3);
`

const ExportPcoPropertiesListItem = ({
  properties,
}: {
  properties: Object,
}) => {
  const client = useApolloClient()
  const { pcname, pname } = properties
  const onClick = useCallback(
    () =>
      client.mutate({
        mutation: removeExportPcoPropertyMutation,
        variables: {
          pcname,
          pname,
        },
      }),
    [pcname, pname],
  )

  return (
    <li>
      {`${pcname}: ${pname}`}
      <ResetSpan onClick={onClick}>zurücksetzen</ResetSpan>
    </li>
  )
}

export default ExportPcoPropertiesListItem
