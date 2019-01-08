// @flow
import React, { useCallback } from 'react'
import styled from 'styled-components'
import { useApolloClient } from 'react-apollo-hooks'

import removeExportRcoPropertyMutation from '../../../removeExportRcoPropertyMutation'

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
  const client = useApolloClient()
  const { pcname, relationtype, pname } = properties
  const onClick = useCallback(
    () =>
      client.mutate({
        mutation: removeExportRcoPropertyMutation,
        variables: {
          pcname,
          relationtype,
          pname,
        },
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

export default ExportRcoPropertiesListItem
