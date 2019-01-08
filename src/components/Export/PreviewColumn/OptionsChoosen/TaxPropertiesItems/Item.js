// @flow
import React, { useCallback } from 'react'
import styled from 'styled-components'
import { useApolloClient } from 'react-apollo-hooks'

import removeExportTaxPropertyMutation from '../../../removeExportTaxPropertyMutation'

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
  const client = useApolloClient()
  const { taxname, pname } = properties
  const onClick = useCallback(
    () =>
      client.mutate({
        mutation: removeExportTaxPropertyMutation,
        variables: {
          taxname,
          pname,
        },
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

export default ExportTaxPropertiesListItem
